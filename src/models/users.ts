import { t } from "elysia";

export const createUserModel = t.Object({
    name: t.String({ minLength: 3 }),
    username: t.String(),
    password: t.String({ minLength: 8 }),
    role: t.Enum({
        admin: "ADMIN",
        user: "USER",
        pm: "PM"
    })
})

export const userIdParams = t.Object({
    id: t.String()
})

export const updateUserModel = t.Optional(createUserModel)

export type CreateUserInput = typeof createUserModel.static