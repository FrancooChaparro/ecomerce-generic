import { Router } from "express";
import { createProduct, productPut, getProducts, getProductParams, deleteProduct } from "../controllers/ProductController";

export const ProductRouter = Router();


ProductRouter.post("/create", createProduct)
ProductRouter.put("/put/:id", productPut)
ProductRouter.get("/", getProducts)
ProductRouter.get("/:id", getProductParams)
ProductRouter.delete("/delete/:id", deleteProduct)
