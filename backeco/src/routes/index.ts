import { Router } from "express";
import { UserRouter } from "./UserRouter";
import { ProductRouter } from "./ProductRouter";

const router = Router();

router.use("/user", UserRouter)
router.use("/product", ProductRouter)

export default router;
