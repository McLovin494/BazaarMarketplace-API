import {Request, Response, NextFunction} from "express";
import {ApiError} from "../utils/ApiError.js";
import {StatusCodes} from "http-status-codes/build/es/index.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    console.log("auth check")
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    if (!token) {
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Unauthorized"
        )
    }
    const decoded= jwt.verify(token,"thisisasecretkey")
    console.log(decoded)
    req.userId=decoded.id
    next()
}