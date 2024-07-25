import { sql } from "drizzle-orm";
import { pgEnum, pgTableCreator, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const userRole = pgEnum("user_role", ["admin", "bronze", "silver", "gold"]);

export const createTable = pgTableCreator((name) => `theia_${name}`);

export const users = createTable("user", {
    id: varchar("id", { length: 255 }).notNull().primaryKey().default(sql`gen_random_uuid()`),
    role: userRole("role").notNull().default("bronze"),
    name: varchar("name", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: timestamp("email_verified", {
        mode: "date",
        withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    password: text("password").notNull(),
    secondFactorSecret: text("second_factor_secret"),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("created_at", {
        mode: "date",
        withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", {
        mode: "date",
        withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
});

