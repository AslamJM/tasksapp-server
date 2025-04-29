import Elysia from "elysia";
import { createUserModel } from "../models/users";
import { getAllUsers, seedAdmin } from "../db/queries/user";

export const userService = new Elysia({ prefix: "users/service" })
    .model({
        "create_user": createUserModel
    })

export const users = new Elysia({ prefix: "/users" })
    .use(userService)
    .get("/", async ({ error }) => {
        try {
            const users = await getAllUsers()
            return users
        } catch (err: any) {
            return error(400, {
                success: false,
                message: err.message
            })
        }
    })
    .post("/", () => { }, {
        body: "create_user"
    })
    .get("/seed", async () => {
        try {
            const res = await seedAdmin()
            return res
        } catch (error: any) {
            return {
                message: error.message
            }
        }
    })