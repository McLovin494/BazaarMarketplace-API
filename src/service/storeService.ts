import {ApiError} from "../utils/ApiError.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import {db} from "../db/db.js";
import {storeTable} from "../db/schemas/storeSchema.js";
import {eq, ilike, or} from "drizzle-orm";
import {sellersTable} from "../db/schemas/sellerSchema.js";

export const createStoreService = async (sellerId: number, storeName: string, location: string, description: string) => {
    try {
        const [seller] = await db.select({sellerId: sellersTable.userId}).from(
            sellersTable
        ).where(eq(
            sellersTable.userId, sellerId
        )).limit(1)
        if (!seller) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "Only registered sellers can perform this action"
            )
        }
        if (!storeName) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Store name is required"
            )
        }
        const [similarName] = await db.select({storeName: storeTable.storeName}).from(storeTable).where(or(
            eq(storeTable.storeName, storeName), ilike(storeTable.storeName, `%${storeName}%`)
        )).limit(1)
        if (similarName) {
            throw new ApiError(StatusCodes.CONFLICT, "Store already exists")
        }
        const [newStore] = await db.insert(storeTable).values({
            storeName: storeName,
            description: description,
            location: location,
            sellerId: sellerId,
        }).returning({
            id: storeTable.id,
            storeName: storeTable.storeName,
            location: storeTable.location,
            description: storeTable.description
        })
        return newStore
    } catch (e) {
        console.log(e)
        console.log("error")
    }
}
export const updateStoreService = async (storeId: number, sellerId: number, location: string, storeName: string, description: string) => {
    try {
        const [seller] = await db.select({sellerId: sellersTable.userId}).from(sellersTable).where(
            eq(
                sellersTable.userId, sellerId
            )
        ).limit(1)
        if (!seller) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "Only registered sellers can perform this action"
            )
        }
        const [store] = await db.select().from(storeTable).where(
            eq(storeTable.id, storeId),
        ).limit(1)
        console.log("check store ", store)
        if (!store) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Store not found")
        }

        const [updatedStore] = await db.update(storeTable).set(
            {
                location: location,
                description: description,
                storeName: storeName,
            }
        ).where(eq(storeTable.id, storeId)).returning({
            id: storeTable.id,
            storeName: storeTable.storeName,
            description: storeTable.description,
            location: storeTable.location,
        });
        console.log("check details", updatedStore)
        return updatedStore
    } catch (e) {
        console.log(e)
        console.log("error")
    }

}
export const deleteStoreService = async (sellerId: number, storeId: number) => {
    try {
        const [seller] = await db.select({sellerId: sellersTable.userId}).from(sellersTable).where(eq(sellersTable.userId, sellerId)).limit(1)
        if (!seller) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "Only registered sellers can perform this action"
            )
        }
        const [store] = await db.select({id: storeTable.id}).from(storeTable).where(eq(storeTable.id, storeId)).limit(1)
        if (!store) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Store not found")
        }
        //mark the store as deleted
        await db.update(storeTable).set({deleted: true}).where(eq(storeTable.id, storeId)).returning()

    } catch (e) {
        console.log(e)
        console.log("error")
    }
}

export const getAllStoreService = async () => {
    try {
        return await db.select().from(storeTable)
    } catch (e) {
        console.log(e)
        console.log("error")
    }
}
export const getStoreByIdService=async(storeId:Number)=>{
    try {
        const [store]=await db.select().from(storeTable).limit(1)
        if(!store){
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Store not found"
            )
        }
        return store
    }catch (e) {
        console.log(e)
        console.log("error")
    }
}