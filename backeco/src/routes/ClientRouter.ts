import { Router } from "express";
import { clientCreate, clientPut } from "../controllers/ClientController";

export const ClientRouter = Router();


ClientRouter.post("/create", clientCreate)
ClientRouter.post("/put/:id", clientPut)
