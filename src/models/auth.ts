import { t } from "elysia";

export const signInSchema = t.Object({
    username: t.String(),
    password: t.String()
})

export const sessionScema = t.Cookie({
    token: t.String()
})

export type SignInInput = typeof signInSchema.static