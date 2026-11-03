import {db} from "../db/db.js"
import {ApiError} from "../utils/ApiError.js";
import {usersTable} from "../db/schemas/userSchema.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import {eq} from "drizzle-orm";
import {generateToken, hashPassword} from "./jwtService.js";
import {customersTable} from "../db/schemas/customerSchema.js";
import {sellersTable} from "../db/schemas/sellerSchema.js";

export const registerCustomerService = async (name: string, email: string, password: string) => {
    try {
        const hashedPassword = await hashPassword(password);
        return await db.transaction(async (tx) => {
            const [existingUser] = await tx.select({email: usersTable.email}).from(usersTable).where(eq(usersTable.email, email)).limit(1)
            if (existingUser) {
                throw new ApiError(
                    StatusCodes.UNAUTHORIZED,
                    "Email already exists"
                )
            }
            //create user
            const [newUser] = await tx.insert(usersTable).values({
                name: name,
                email,
                password: hashedPassword
            }).returning({
                id: usersTable.id,
                name: usersTable.name,
                email: usersTable.email
            })
           const check= await tx.insert(customersTable).values({
                userId: newUser.id,

            })
            console.log(check)
            return newUser
        })

    } catch (e) {
        console.log("error")
        console.log(e)
    }
}

export const registerSellerService = async (name: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return await db.transaction(async (tx) => {
        const [existingUser] = await tx.select({email: usersTable.email}).from(usersTable).where(eq(usersTable.email, email)).limit(1)
        if (existingUser) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "Email already exists"
            )
        }
        const [newUser] = await tx.insert(usersTable).values({
            name,
            email,
            password: hashedPassword
        }).returning(
            {
                id: usersTable.id,
                name: usersTable.name,
                email: usersTable.email
            }
        )
       const check= await tx.insert(sellersTable).values({
            userId: newUser.id,
        })
        console.log(check)
        return newUser
    })
}
export const login = async (email: string, password: string) => {
    try {
        //
        if (!email || !password) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Invalid credentials"
            )

        }
        //check if registered
        const [existingUser] = await db.select({
            email: usersTable.email,
            id: usersTable.id
        }).from(usersTable).where(eq(usersTable.email, email))
        if (!existingUser) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "Register first"
            )
        }
        //generate token
        const token = generateToken(existingUser.id)
        return token
    } catch (e) {
        console.log("error")
        console.log(e)
    }
}

