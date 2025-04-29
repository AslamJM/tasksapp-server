import Elysia from "elysia"
import { validateSession } from "../db/queries/session"

export const isSignedIn = (isEnabled: boolean) => {
    if (!isEnabled) return
    return {
        beforeHandle({ error, cookie }: Elysia["applyMacro"]) {
            try {
                if (!cookie || !cookie.token || !cookie.token.value) {
                    return error(401)
                }
                const userId = validateSession(cookie.token as unknown as string, new Date())
                if (!userId) {
                    return error(401)
                }
            } catch (e: any) {
                return error(500, { message: e.message })
            }

        }
    }
}