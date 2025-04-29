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