import { Router } from "express";
import { createProduct } from "../controllers/ProductController";

export const ProductRouter = Router();


ProductRouter.post("/create", createProduct)