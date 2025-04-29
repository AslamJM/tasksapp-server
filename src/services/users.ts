import Elysia from "elysia";
import { createUserModel } from "../models/users";

export const userService = new Elysia({ prefix: "users/service" })
    .model({
        "create_user": createUserModel
    })

export const users = new Elysia({ prefix: "/users" })
    .use(userService)
    .get("/", () => { })
    .post("/", () => { }, {
        body: "create_user"
    })   