import { SignInInput } from "../../models/auth";
import { verifyPassword } from "../../utils/password";
import { createSession } from "./session";
import { getUserByEmail } from "./user";

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