import { SignInInput } from "../../models/auth";
import { verifyPassword } from "../../utils/password";
import { createSession, getSessionById } from "./session";
import { getUserByUsername, getUserById } from "./user";

export async function signIn(input: SignInInput) {
    try {
        const { username, password } = input
        const user = await getUserByUsername(username)

        if (!user || !await (verifyPassword(password, user.password))) {
            throw new Error("invalid credentials")
        }

        const session = await createSession(user.id)
        const { password: _, ...rest } = user
        return {
            user: rest,
            session
        }

    } catch (error) {
        throw error
    }
}

export async function profile(sessionId: string) {
    try {
        const session = await getSessionById(sessionId)
        const user = await getUserById(session.user_id)
        const { name, username, role } = user

        return {
            name, username, role
        }

    } catch (error) {
        throw error
    }
}