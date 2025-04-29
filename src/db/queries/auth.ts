import { SignInInput } from "../../models/auth";
import { verifyPassword } from "../../utils/password";
import { createSession, getSessionById } from "./session";
import { getUserByEmail, getUserById } from "./user";

export async function signIn(input: SignInInput) {
    try {
        const { email, password } = input
        const user = await getUserByEmail(email)

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
        const { name, email, role } = user

        return {
            name, email, role
        }

    } catch (error) {
        throw error
    }
}