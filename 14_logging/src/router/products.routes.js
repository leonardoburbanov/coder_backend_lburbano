import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";
import { adminMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.get("/:idProduct", productsController.getProductById);
router.post("/", productsController.addProduct);
router.put("/:idProduct", adminMiddleware, productsController.updateProduct);
router.delete("/:idProduct", adminMiddleware, productsController.deleteProduct);

export default router;
