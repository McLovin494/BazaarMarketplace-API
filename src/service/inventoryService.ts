import {db} from "../db/db.js";
import {storeTable} from "../db/schemas/storeSchema.js";
import {and, eq} from "drizzle-orm";
import {ApiError} from "../utils/ApiError.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import {inventoryTable} from "../db/schemas/inventorySchema.js";
import {productsTable} from "../db/schemas/productSchema.js";

export const updateInventory=async(productId:number,sellerId:number,storeId:number,qty:number)=>{
    try {
        //check ownership
        const[store]=await db.select().from(storeTable).where(eq(storeTable.id,storeId))
        if(!store){
            throw new ApiError(StatusCodes.NOT_FOUND,"Store not found")
        }
        if(store.sellerId!==sellerId){
            throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action")
        }
        const[product]=await db.select().from(productsTable).where(
            and(
                eq(productsTable.id,productId),
                eq(productsTable.storeId,storeId)
            )
        )
        if (!product){
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found in this store")
        }
        //verified now  update
        const[updatedInventory]=await db.update(inventoryTable).set({
            quantity:qty
        }).where(eq(storeTable.id,storeId)).returning()
        if (!updatedInventory) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Inventory record not found");
        }
        return updatedInventory
    }catch (e) {
        console.log("error",e)
    }
}

