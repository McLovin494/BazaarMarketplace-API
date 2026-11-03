import {StoreRequest} from "../types/storeRequest.js";
import {Request,Response} from "express";
import {
    createStoreService,
    deleteStoreService, findProductsOfSingleStoreService,
    getAllStoreService, getStoreByIdService,
    updateStoreService
} from "../service/storeService.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import product from "../router/product.js";

export const registerStore = async (req: Request<{},{},StoreRequest>, res: Response) => {
const {storeName,location,description}=req.body
    const newStore=await createStoreService(req.userId,storeName,location,description);
    console.log("create store")
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Store registered",
        newStore
    })
}

export const updateStoreDetails=async(req:Request,res:Response)=>{
    const {storeId}=req.params
    const{
        storeName,
        description,
        location
    }=req.body
    const updatedStore=await updateStoreService(Number(storeId),req.userId,location,storeName,description)
    console.log("check updated details",updatedStore)
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"Store details updated",
        updatedStore
    })
}
export const markStoreDelete=async(req:Request,res:Response)=>{
    const{storeId}=req.params

    await deleteStoreService(req.userId,Number(storeId))
    return res.status(StatusCodes.NOT_FOUND).json({
        success:true,
        message:"Store deleted"

    })

}

export const fetchAllStores=async(req:Request,res:Response)=>{
    const stores=await getAllStoreService()
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"Stores fetched",
        stores
    })
}

export const getStoreById=async(req:Request,res:Response)=>{
    const {storeId}=req.params
    const store=await getStoreByIdService(Number(storeId))
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"Store fetched",
        store
    })
}
export const findStoreProducts=async(req:Request,res:Response)=>{
    const{storeId}=req.params
    const products=await findProductsOfSingleStoreService(Number(storeId))
    return res.status(StatusCodes.OK).json(products)
}