"use client";

import { checkOrSetup2faAction } from "$server/auth/checkOrSetup2fa";
import { loginStatusSignal } from "$src/app/signals";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import Spinner from "../Utils/Spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useToast } from "../ui/use-toast";

export default function SecondFactorForm() {
    const { email, password } = loginStatusSignal.value;
    const [loading, startTransition] = useTransition();
    const [topt, setTotp] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        const check2faSetup = async () => {
            const res = await checkOrSetup2faAction(email ?? "");
            if (!res.success) {
                console.error(res.errorMessage);
                toast({
                    title: "Error",
                    description: res.errorMessage,
                    variant: "destructive",
                });
                return;
            }
            if (res.data) {
                loginStatusSignal.value = {
                    ...loginStatusSignal.value,
                    status: "2faSetup",
                    keyUri: res.data,
                };
            }
        };
        check2faSetup().catch((e) => {
            console.error(e);
        });
    }, []);

    useEffect(() => {
        if (topt.length === 6) {
            startTransition(() => {
                login(topt);
            });
        }
    }, [topt]);

    async function login(totp: string) {
        const loginRes = await signIn("credentials", {
            email,
            password,
            totp,
            redirect: false,
        });
        if (!loginRes?.ok) {
            console.error("Invalid access code", loginRes?.error);
            setTotp("");
            toast({
                title: "Error",
                description: "Invalid access code",
                variant: "destructive",
            });
        }
        // redirect will happen automatically
    }

    return (
        <form className="flex flex-col items-center gap-8">
            {loading && <Spinner />}
            <h1 className="text-text-secondary text-center font-semibold">
                Please enter the code from your authenticator app on your device
            </h1>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={topt} onChange={(val) => setTotp(val)}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <span className="text-text-secondary pl-1 text-sm">
                Can&apos;t access your code?{" "}
                <Link className="text-primary" href="mailto:info@theia.tech" target="_blank">
                    Contact us for help
                </Link>
            </span>
        </form>
    );
}
