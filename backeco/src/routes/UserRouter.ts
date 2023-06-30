import { Router } from "express";
import { crear } from "../controllers/createUser";
export const UserRouter = Router();


UserRouter.post("/create", crear)

// export { UserRouter }