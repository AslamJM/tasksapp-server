import { t } from "elysia";

export const createUserModel = t.Object({
    name: t.String({ minLength: 3 }),
    email: t.String({ format: "email" }),
    password: t.String({ minLength: 8 })
})

export type CreateUserInput = typeof createUserModel.static