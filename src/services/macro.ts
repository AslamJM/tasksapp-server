import Elysia from "elysia"
import { validateSession } from "../db/queries/session"
import { UserRole } from "../db/schema"
import { getUserById } from "../db/queries/user"

export const isSignedIn = (isEnabled: boolean) => {
    if (!isEnabled) return
    return {
        async beforeHandle({ error, cookie, store }: Elysia["applyMacro"]) {
            try {

                if (!cookie || !cookie.token || !cookie.token.value) {
                    return error(401)
                }
                const userId = await validateSession(cookie.token as unknown as string, new Date())
                if (!userId) {
                    return error(401)
                }
                store = { ...store, userId }
            } catch (e: any) {
                return error(500, { message: e.message })
            }

        }
    }
}

export const roleMacro = (required_role: UserRole | undefined) => {
    if (!required_role) return { username: "no role required" }

    return {
        async beforeHandle({ error, cookie }: Elysia["applyMacro"]) {
            if (!cookie || !cookie.token || !cookie.token.value) {
                return error(403)
            }
            const userId = await validateSession(cookie.token as unknown as string, new Date())
            if (!userId) {
                return error(403)
            }
            const user = await getUserById(userId)
            if (!user) {
                return error(403)
            }

            const userRole = user.role

            if (userRole === "ADMIN") {
                return
            }

            if (required_role === "PM" && userRole === "USER") {
                return error(403)
            }

            if (required_role === "ADMIN") {
                return error(403)
            }

        }
    }
}