import bcrypt from "bcryptjs"
import jwt, {JwtPayload} from "jsonwebtoken"
export const hashPassword = async (plainPassword: string): Promise<string> => {
    return await bcrypt.hash(plainPassword, 10)
}
export const verifyPassword=(originalPassword:string):JwtPayload|string=>{
    return  jwt.verify(originalPassword,"thisisasecretkey")
}
export const generateToken=(id:number):string=>{
    return jwt.sign({id:id},"thisisasecretkey",{expiresIn:"30m"})
}