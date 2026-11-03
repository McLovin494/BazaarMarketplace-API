import {Request, Response} from "express";
import {
    createProductService,
    deleteProductService,
    findAllProductsService, findProductByIdService,
    updateProductService
} from "../service/productService.js";
import {CreateProductRequest, UpdateProductRequest} from "../types/productRequest.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";

export const createProduct = async (req: Request<{ }, {}, CreateProductRequest>, res: Response) => {

    const payload={
        ...req.body,

    }
    const product=await createProductService(payload,Number(req.userId))
    return res.status(StatusCodes.CREATED).json(product)
}
export const updateProduct=async(req:Request<{productId:string},{},UpdateProductRequest>,res:Response)=>{
    const{productId}=req.params
    const payload={
        ...req.body,
        productId:Number(productId)
    }
    const product=await updateProductService(payload,Number(req.userId))
    return res.status(StatusCodes.OK).json(product)
}

export const deleteProduct=async(req:Request<{productId:string},{},{}>,res:Response)=>{
    const{productId}=req.params
    await deleteProductService(Number(productId))
    res.status(StatusCodes.OK).json(
        {success: true,message:"Product deleted"}

    )
}
export const findProductById=async(req:Request<{productId:number},{},{}>,res:Response)=>{
    const{productId}=req.params
   const product= await findProductByIdService(Number(productId))
    return res.status(StatusCodes.OK).json(product)
}

export const findAllProducts=async(req:Request,res:Response)=>{

    const products=await  findAllProductsService();
    return res.status(StatusCodes.OK).json(products)
}