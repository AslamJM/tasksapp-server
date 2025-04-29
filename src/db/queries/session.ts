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

export async function validateSession(sessionId: string, time: Date) {
    try {
        const session = await getSessionById(sessionId)
        if (session.expired_at > time) {
            return session.user_id
        }
        return null
    } catch (error) {
        throw error
    }
}

export async function deleteSession(id: string) {
    try {
        await db.delete(sessionsTable).where(eq(sessionsTable.id, id))
        return true
    } catch (error) {
        throw error
    }
}