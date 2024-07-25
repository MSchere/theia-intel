import { users } from "$src/server/db/schema";

export type DbUser = typeof users.$inferSelect;

export type UserRole = typeof users.$inferSelect.role;
