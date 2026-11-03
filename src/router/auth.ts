import {Router} from "express";
import {customerRegister, sellerRegister, userLogin} from "../controller/userController.js";
import {login} from "../service/authService.js";
const router=Router()

router.post("/seller/register",sellerRegister)
router.post("/customer/register",customerRegister)
router.post("/login",userLogin)
export default router