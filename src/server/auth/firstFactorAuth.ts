"use server";

import { LoginFormSchema } from "$lib/schemas/form.schemas";
import { type SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { compare } from "bcrypt";
import { UsersRepository } from "../users/users.repository";

export async function firstFactorAuthAction(prevState: unknown, formData: FormData): Promise<SubmissionResult> {
    const sumbission = parseWithZod(formData, { schema: LoginFormSchema });
    if (sumbission.status !== "success") {
        return sumbission.reply();
    }
    const { email, password } = sumbission.value;

    const user = await UsersRepository.getUserByEmail(email);
    if (!user) {
        console.error("User not found");
        return sumbission.reply({
            fieldErrors: {
                email: ["User not found"],
            },
        });
    }
    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) {
        console.error("Incorrect password");
        return sumbission.reply({
            fieldErrors: {
                password: ["Incorrect password"],
            },
        });
    }
    return sumbission.reply();
}
