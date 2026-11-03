import {CreateProductRequest, UpdateProductRequest} from "../types/productRequest.js";
import {db} from "../db/db.js";
import {and, eq} from "drizzle-orm";
import {storeTable} from "../db/schemas/storeSchema.js";
import {ApiError} from "../utils/ApiError.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import {productsTable} from "../db/schemas/productSchema.js";
import {inventoryTable} from "../db/schemas/inventorySchema.js";

export const createProductService = async (data: CreateProductRequest,userId:number) => {


    try {
        const [store] = await db.select().from(storeTable).where(eq(storeTable.id, data.storeId)).limit(1)
        if (!store) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Store not found")
        }
        //check if logged-in user owns the store
        if (userId !== store.sellerId) {
            throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action")
        }
        return await db.transaction(async (tx) => {
            const [createdProduct] = await tx.insert(productsTable).values({
                shipping: data.shipping,
                returnPolicy: data.returnPolicy,
                delivery: data.delivery,
                productName: data.productName,
                price: String(data.price),
                category: data.category,
                description: data.description,
                storeId: store.id,
            }).returning()
            await tx.insert(inventoryTable).values({
                quantity: 0,
                productId: createdProduct.id
            })
            return createdProduct
        })
    } catch (e) {
        console.log(e)
        console.log("error", e)
    }
}
export const updateProductService = async (data: UpdateProductRequest,userId:number) => {
    try {
        const [product] = await db
            .select({
                id: productsTable.id,
                storeId: productsTable.storeId
            }).from(productsTable)
            .innerJoin(
                storeTable,
                eq(productsTable.storeId, storeTable.id)
            )
            .where(
                and(
                    eq(productsTable.id, Number(data.productId)),
                    eq(storeTable.sellerId, userId)
                )
            ).limit(1)
        if (!product) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }
        //check ownership

        const [updatedProduct] = await db.update(productsTable).set({
            shipping: data.shipping,
            returnPolicy: data.returnPolicy,
            delivery: data.delivery,
            productName: data.productName,
            price: data.price !== undefined ? String(data.price) : undefined,
            category: data.category,
            description: data.description
        }).where(eq(productsTable.id, product.id))
            .returning()
        return updatedProduct
    } catch (e) {
        console.log(e)
        console.log("error", e)
    }
}
export const deleteProductService=async(productId:number)=>{
    try {
        const [product] = await db
            .select({
                id: productsTable.id,
                storeId: productsTable.storeId
            }).from(productsTable)
            .innerJoin(
                storeTable,
                eq(productsTable.storeId, storeTable.id)
            )
            .where(
                and(
                    eq(productsTable.id, Number(productId)),
                    eq(storeTable.sellerId, req.userId)
                )
            ).limit(1)
        if(!product){
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }
        await db.delete(productsTable).where(eq(productsTable.id, productId))

    }catch (e) {
        console.log(e)
        console.log("error", e)
    }
}

export const findProductByIdService=async(productId:number)=>{
    try {
    const [product]=await db.select().from(productsTable).limit(1)
        if(!product){
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }
        return product
    }catch (e) {
        console.log(e)
        console.log("error", e)
    }
}
export const findAllProductsService=async()=>{
    try {
         const products=await db.select().from(productsTable)
         if(products.length==0){
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }
         return products
    }catch (e) {
        console.log("error",e)
    }
}