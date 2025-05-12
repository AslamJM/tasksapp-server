import { createId } from "@paralleldrive/cuid2";
import { boolean, pgEnum, pgTable, text, timestamp, varchar, } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "USER", "PM"])
export type UserRole = 'ADMIN' | "USER" | "PM"

export const usersTable = pgTable("users", {
    id: text("cuid").primaryKey().$defaultFn(() => createId()),
    name: varchar({ length: 200 }).notNull(),
    username: varchar({ length: 200 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: roleEnum().notNull().default("USER"),
    created_at: timestamp().defaultNow().notNull(),
    is_deleted: boolean().default(false).notNull()
})

export const sessionsTable = pgTable("sessions", {
    id: text("cuid").primaryKey().$defaultFn(() => createId()),
    user_id: text().notNull(),
    expired_at: timestamp().notNull(),
    created_at: timestamp().defaultNow()
})