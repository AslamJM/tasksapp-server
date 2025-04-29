import Elysia from "elysia";
import { sessionScema, signInSchema } from "../models/auth";
import { signIn } from "../db/queries/auth";

const authService = new Elysia({ prefix: "auth/service" })
    .model({
        signIn: signInSchema,
        session: sessionScema
    })

export const auth = new Elysia({ prefix: "/auth" })
    .use(authService)
    .post("/sign-in", async ({ body, cookie: { token }, error }) => {
        try {
            const { user, session } = await signIn(body)
            token.value = session
            return user
        } catch (err: any) {
            return error(400, {
                message: err.message
            })
        }
    }, {
        body: "signIn",
    })