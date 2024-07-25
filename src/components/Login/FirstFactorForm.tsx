"use client";

import { LoginFormSchema } from "$lib/schemas/form.schemas";
import { firstFactorAuthAction } from "$server/auth/firstFactorAuth";
import { loginStatusSignal } from "$src/app/signals";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export default function FirstFactorForm() {
    const [lastResult, formAction] = useFormState(firstFactorAuthAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: LoginFormSchema });
        },
        shouldValidate: "onSubmit",
        shouldRevalidate: "onInput",
    });

    useEffect(() => {
        if (lastResult?.status !== "success") {
            return;
        }
        if (fields.email.valid && fields.password.valid) {
            const email = fields.email.value;
            const password = fields.password.value;
            loginStatusSignal.value = { status: "secondFactor", email, password };
        }
    }, [fields, lastResult]);

    return (
        <form action={formAction} {...getFormProps(form)} className="flex w-full flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground pl-1" htmlFor="email">
                        EMAIL
                    </label>
                    <Input
                        autoFocus={true}
                        name={fields.email.name}
                        placeholder="user@theia.tech"
                        className="h-[50px] w-full rounded text-xl"
                        type="email"
                    />
                    {!fields.email.valid && <p className="text-red-500">{fields.email.errors?.[0]}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-muted-foreground pl-1" htmlFor="password">
                        PASSWORD
                    </label>
                    <Input
                        name={fields.password.name}
                        placeholder="••••••••"
                        className="h-[50px] w-full rounded text-xl"
                        type="password"
                    />
                    {!fields.password.valid && <p className="text-red-500">{fields.password.errors?.[0]}</p>}
                </div>
                <Link href={`/forgot-password?email=${fields.email.name}`} className="pl-1 text-sm">
                    Forgot your password?
                </Link>
            </div>
            <LoginButton />
            <span className="pl-1 text-sm text-text-secondary text-center">
                Don&apos;t have an account?
                <a href="https://theia.tech/contact" target="/blank">
                    {" "}
                    Contact us to get started
                </a>
            </span>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="h-[50px] w-full py-2" size="lg" disabled={pending}>
            Login
        </Button>
    );
}
