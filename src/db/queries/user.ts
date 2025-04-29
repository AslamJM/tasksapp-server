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
        const { email, name, password } = input
        const hash = await hashPassword(password)
        const user = await db.insert(usersTable).values({
            name,
            email,
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

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
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
            email: "Admin@app.com",
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