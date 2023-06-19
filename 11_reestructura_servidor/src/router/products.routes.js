import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";

const router = Router();

const productsController = new ProductsController();

router.get("/", productsController.getProducts);
router.get("/:idProduct", productsController.getProductById);
router.post("/", productsController.addProduct);
router.put("/:idProduct", productsController.updateProduct);
router.delete("/:idProduct", productsController.deleteProduct);

export default router;
