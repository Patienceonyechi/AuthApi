import jwt from "jsonwebtoken"

export const tokenGenerator = (data:any) =>{
    return jwt.sign(data, "asdfghjkl", {expiresIn:"10ms"})
}