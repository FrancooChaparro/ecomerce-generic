import { Router } from "express";
import { clientCreate } from "../controllers/ClientController";

export const ClientRouter = Router();


ClientRouter.post("/create", clientCreate)
// ClientRouter.post("/put/:id", clientPut)
// ClientRouter.get("/", getClients)
// ClientRouter.get("/:id", getClientParams)
// ClientRouter.delete("/delete/:id", deleteClient)
// ClientRouter.post("/login", clientLogin)