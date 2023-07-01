import { Router } from "express";
import { UserCreate, UserPut } from "../controllers/createUser";

export const UserRouter = Router();


UserRouter.post("/create", UserCreate)
UserRouter.post("/put/:id", UserPut)