import { Router } from "express";
import { createProduct, productPut } from "../controllers/ProductController";

export const ProductRouter = Router();


ProductRouter.post("/create", createProduct)
ProductRouter.put("/put/:id", productPut)