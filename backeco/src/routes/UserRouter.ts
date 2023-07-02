import { Router } from "express";
import { userCreate, userPut, getUsers, getUserParams, deleteUser, userLogin } from "../controllers/UserController";

export const UserRouter = Router();


UserRouter.post("/create", userCreate)
UserRouter.post("/put/:id", userPut)
UserRouter.get("/", getUsers)
UserRouter.get("/:id", getUserParams)
UserRouter.delete("/delete/:id", deleteUser)
UserRouter.post("/login", userLogin)