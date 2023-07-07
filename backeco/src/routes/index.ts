import { Router } from "express";
import { UserRouter } from "./UserRouter";
import { ProductRouter } from "./ProductRouter";

const router = Router();

router.use("/user", UserRouter)
router.use("/product", ProductRouter)
router.use("/client", ProductRouter)


export default router;
