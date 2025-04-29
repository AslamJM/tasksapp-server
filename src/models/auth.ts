import { t } from "elysia";

export const signInSchema = t.Object({
    email: t.String({ format: 'email' }),
    password: t.String()
})

export const sessionScema = t.Cookie({
    token: t.String()
})

export type SignInInput = typeof signInSchema.static