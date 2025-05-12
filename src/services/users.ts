import Elysia from "elysia";
import { createUserModel, updateUserModel, userIdParams } from "../models/users";
import { createUser, getAllUsers, seedAdmin, updateUser } from "../db/queries/user";
import { isSignedIn, roleMacro } from "./macro";

export const userService = new Elysia({ prefix: "users/service" })
    .model({
        "create_user": createUserModel,
        "user_id": userIdParams,
        "update_user": updateUserModel
    })
    .macro({
        isSignedIn: isSignedIn,
        required_role: roleMacro
    })

export const users = new Elysia({ prefix: "/users" })
    .use(userService)

    // get all users for admin usage
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
    }, {
        isSignedIn: true,
        required_role: "ADMIN"
    })

    // create a user by the admin
    .post("/", async ({ body, error }) => {
        try {
            const user = await createUser(body)
            return user
        } catch (err: any) {
            return error(500, {
                success: false,
                message: err.message
            })
        }
    }, {
        body: "create_user",
        required_role: "ADMIN"
    })

    // update user info by admin including password
    .patch("/:id", async ({ params, body, error }) => {
        try {
            const updated = await updateUser(params.id, body)
            return updated
        } catch (err: any) {
            return error(500, {
                success: false,
                message: err.message
            })
        }
    }, {
        params: "user_id",
        body: "update_user",
        required_role: "ADMIN"
    })

    // public route for database seeding
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