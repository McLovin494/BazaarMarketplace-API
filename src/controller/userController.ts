import {login, registerCustomer, registerSeller} from "../service/authService.js";
import {RegisterCustomer, RegisterRequest, RegisterSeller} from "../types/registerRequest.js";
import {Request,Response} from "express"
import {StatusCodes} from "http-status-codes/build/es/index.js";
import {ApiError} from "../utils/ApiError.js";
export const customerRegister=async(req:Request<{},{},RegisterCustomer>,res:Response)=>{
    try{
        const{email,name,password}=req.body
        const user=await registerCustomer(name,email,password)
        console.log("customer",user)

        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"User created successfully",
            user
        })
    }catch (e) {
        console.log("Error")
        console.log(e)
    }
}

export const sellerRegister=async(req:Request<{},{},RegisterSeller>,res:Response)=>{

    try{
        const{email,name,password}=req.body
        const user=await registerSeller(name,email,password)
        console.log("seller",user)
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Seller created successfully",
            user
        })
    }catch (e) {
        console.log("Error")
        console.log(e)
    }
}

export const userLogin=async(req:Request,res:Response)=>{
    try {
        console.log("login")
        const{email,password}=req.body
        if(!email||!password){
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Invalid credentials"
            )
        }
        const token=await login(email,password)
        const data= {
            "token":token,
            "type":"bearer"
        }
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Login successfully",
            data
        })
    }catch (e) {
        console.log("Error")
        console.log(e)
    }
}