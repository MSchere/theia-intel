"use client";

import Spinner from "$components/Utils/Spinner";
import { loginStatusSignal } from "$src/app/signals";
import { signIn } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import QRCode from "react-qr-code";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useToast } from "../ui/use-toast";

export default function SecondFactorSetup() {
    const { email, password, keyUri } = loginStatusSignal.value;
    const secretKey = keyUri?.split("=")[1]?.replace("&period", "");
    const { toast } = useToast();
    const [loading, startTransition] = useTransition();
    const [totp, setTotp] = useState("");
    const [showSecret, setShowSecret] = useState<boolean>(false);

    useEffect(() => {
        if (totp.length === 6) {
            startTransition(() => {
                login(totp);
            });
        }
    }, [totp]);

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
        <form className="flex w-full flex-col gap-8">
            {loading && <Spinner />}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-text-secondary text-center font-semibold">
                        Please scan this code with your preferred mobile authenticator app
                    </h1>
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                        <QRCode className="h-48 w-48 p-2 bg-white" value={keyUri ?? ""} />
                        <span className="text-text-secondary w-[200px] pl-1 text-center text-sm">
                            Alternatively you can manually introduce a{" "}
                            <button
                                type="button"
                                className="font-bold text-primary"
                                onClick={() => setShowSecret(!showSecret)}
                            >
                                secret key
                            </button>
                        </span>
                        {showSecret && (
                            <span className="text-text-secondary text-center text-sm font-semibold">{secretKey}</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-muted-foreground text-center pl-1" htmlFor="password">
                            AUTHENTICATOR CODE
                        </label>
                        <div className="flex w-full items-center justify-center">
                            <InputOTP maxLength={6} value={totp} onChange={(val) => setTotp(val)}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
