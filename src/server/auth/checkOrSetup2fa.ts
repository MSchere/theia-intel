"use server";

import { ActionErrors, type ActionResponse } from "$lib/types/action.types";
import { symmetricEncrypt } from "$lib/utils/crypto.utils";
import { env } from "$src/env";
import { authenticator } from "otplib";
import { UsersRepository } from "../users/users.repository";

export async function checkOrSetup2faAction(email: string): Promise<ActionResponse<string>> {
    const user = await UsersRepository.getUserByEmail(email);
    if (!user) {
        return {
            success: false,
            errorCode: ActionErrors.NOT_FOUND,
            errorMessage: "User not found",
        };
    }

    let keyUri = "";
    if (!user.secondFactorSecret) {
        const secret = authenticator.generateSecret(32);
        keyUri = authenticator.keyuri(email, "Theia Intel", secret);
        const encryptedSecret = symmetricEncrypt(secret, env.ENCRYPTION_KEY);
        const update = await UsersRepository.updateUser(user.id, { secondFactorSecret: encryptedSecret });
        if (!update?.updatedId) {
            console.error("Error updating user with 2FA secret");
            return {
                success: false,
                errorCode: ActionErrors.INTERNAL_SERVER_ERROR,
                errorMessage: "Error updating user with 2FA secret",
            };
        }
    }
    return { success: true, data: keyUri };
}
