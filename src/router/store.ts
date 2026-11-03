import {Router} from "express";
import {
    fetchAllStores,
    getStoreById,
    markStoreDelete,
    registerStore,
    updateStoreDetails
} from "../controller/storeController.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js";
const router=Router()
router.post("/store",isAuthenticated,registerStore)
router.patch("/store/:storeId",isAuthenticated,updateStoreDetails)
router.delete("/store/:storeId",isAuthenticated,markStoreDelete)
router.get("/store",fetchAllStores)
router.get("/store/:storeId",getStoreById)
export default  router