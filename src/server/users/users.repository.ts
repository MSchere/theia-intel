import { DbUser } from "$src/lib/types/user.types";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export class UsersRepository {
    // Read operations
    static async getUserById(id: string): Promise<DbUser | undefined> {
        return (await db.select().from(users).where(eq(users.id, id)))[0];
    }

    static async getUserByEmail(email: string): Promise<DbUser | undefined> {
        return (await db.select().from(users).where(eq(users.email, email)))[0];
    }

    // Write operations
    static async updateUser(id: string, update: Partial<DbUser>): Promise<{ updatedId: string } | undefined> {
        return (await db.update(users).set(update).where(eq(users.id, id)).returning({ updatedId: users.id }))[0];
    }
}
