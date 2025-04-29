import Elysia, { t } from "elysia";
import { sessionScema, signInSchema } from "../models/auth";
import { profile, signIn } from "../db/queries/auth";
import { isSignedIn } from "./macro";
import { deleteSession } from "../db/queries/session";

const authService = new Elysia({ prefix: "auth/service" })
    .model({
        signIn: signInSchema,
        session: sessionScema,
        optionalSession: t.Optional(t.Ref('session'))
    })
    .macro({
        isSignedIn: isSignedIn
    })

export const auth = new Elysia({ prefix: "/auth" })
    .use(authService)
    .post("/sign-in", async ({ body, cookie: { token }, error }) => {
        try {
            const { user, session } = await signIn(body)
            token.value = session
            token.httpOnly = true
            return user
        } catch (err: any) {
            return error(400, {
                message: err.message
            })
        }
    }, {
        body: "signIn",
        isSignedIn: false
    })
    .get("profile", async ({ cookie: { token }, error }) => {
        try {
            const user = await profile(token.value)
            return user
        } catch (e: any) {
            return error(500, {
                message: e.message
            })
        }
    }, {
        cookie: "session",
        isSignedIn: true
    })
    .post("/sign-out", async ({ cookie: { token }, error }) => {
        try {
            await deleteSession(token.value)
            token.remove()
            return {
                success: true
            }
        } catch (e: any) {
            return error(500, {
                message: e.message
            })
        }
    }, {
        cookie: "optionalSession"
    })