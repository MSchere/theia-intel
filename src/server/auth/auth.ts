import { type DefaultSession, type NextAuthOptions, getServerSession } from "next-auth";

import { env } from "$src/env";
import { UserRole } from "$src/lib/types/user.types";
import { symmetricDecrypt } from "$src/lib/utils/crypto.utils";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticator } from "otplib";
import { UsersRepository } from "../users/users.repository";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            role: UserRole;
        } & DefaultSession["user"];
    }

    interface User {
        role: UserRole;
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = { ...user };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...token,
                },
                maxAge: 14 * 24 * 60 * 60, // 14 days
            };
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                totp: { label: "Totp Code", type: "Totp" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.error("No credentials provided");
                    return null;
                }

                if (!credentials.email || !credentials.totp || !credentials.password) {
                    console.error("Missing required credentials");
                    return null;
                }
                const user = await UsersRepository.getUserByEmail(credentials.email);
                if (!user?.secondFactorSecret) {
                    console.error("User does not have 2FA enabled");
                    return null;
                }
                const passwordCorrect = await compare(credentials.password, user.password);
                if (!passwordCorrect) {
                    console.error("Incorrect password");
                    return null;
                }
                const secret = symmetricDecrypt(user.secondFactorSecret, env.ENCRYPTION_KEY);
                const totpCorrect = authenticator.check(credentials.totp, secret);
                if (!totpCorrect) {
                    console.error("Invalid totp code");
                    return null;
                }
                console.log("User authenticated with 2FA", user.email);
                return {
                    id: `${user.id}`,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
