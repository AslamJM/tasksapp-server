import { eq } from "drizzle-orm"
import { db } from ".."
import { expTime } from "../../utils/session"
import { sessionsTable } from "../schema"

export async function createSession(userId: string) {
    try {
        const session = await db.insert(sessionsTable).values({
            user_id: userId,
            expired_at: expTime()
        }).returning()
        return session[0].id
    } catch (error) {
        throw error
    }
}

export async function getSessionById(id: string) {
    try {
        const session = await db.select().from(sessionsTable).where(eq(sessionsTable.id, id)).limit(1)
        if (session.length === 0) {
            throw new Error("Not Found")
        }
        return session[0]
    } catch (error) {
        throw error
    }
}