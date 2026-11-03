import {Router} from "express";
import {isAuthenticated} from "../middleware/isAuthenticated.js";
import {
    createProduct,
    deleteProduct,
    findAllProducts,
    findProductById,
    updateProduct
} from "../controller/productController.js";
const router=Router()
router.post("/product",isAuthenticated,createProduct)
router.patch("/product/:productId",isAuthenticated,updateProduct)
router.delete("/product/:productId",isAuthenticated,deleteProduct)
router.get("/product",findAllProducts)
router.get("/product/:productId",findProductById)
export default  router