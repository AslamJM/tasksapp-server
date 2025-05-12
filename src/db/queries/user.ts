import { eq } from "drizzle-orm"
import { db } from ".."
import { usersTable } from "../schema"
import { CreateUserInput } from "../../models/users"
import { hashPassword } from "../../utils/password"

export const getAllUsers = async () => {
    try {
        const users = await db.select().from(usersTable)
            .where(eq(usersTable.is_deleted, false))

        return users
    } catch (error) {
        throw error
    }
}

export const createUser = async (input: CreateUserInput) => {
    try {
        const { username, name, password } = input
        const hash = await hashPassword(password)
        const user = await db.insert(usersTable).values({
            name,
            username,
            password: hash,
        }).returning()
        return user
    } catch (error) {
        throw error
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.select().from(usersTable)
            .where(eq(usersTable.id, id)).limit(1)

        if (user.length === 0) {
            throw new Error("Not Found")
        }

        return user[0]

    } catch (error) {
        throw error
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1)
        if (user.length === 0) {
            return null
        }
        return user[0]
    } catch (error) {
        throw error
    }
}

export const seedAdmin = async () => {
    try {
        const password = await hashPassword("123456")
        await db.insert(usersTable).values({
            name: "Admin",
            username: "admin",
            password,
            role: "ADMIN"
        })
        return {
            message: "Seeded Successfully"
        }
    } catch (error) {
        throw error
    }
}

export async function updateUser(id: string, values: Partial<CreateUserInput>) {
    try {
        if (values.password) {
            const hash = await hashPassword(values.password)
            values.password = hash
        }

        const updated = await db.update(usersTable)
            .set(values).where(eq(usersTable.id, id)).returning()
        return updated[0]

    } catch (error) {
        throw error
    }
}