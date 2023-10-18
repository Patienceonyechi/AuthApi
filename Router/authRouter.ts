import express, {Router} from "express"
import  jwt  from "jsonwebtoken";
import upload  from "../Middleware/multer";

import { registerUser, login, logOut, gellAllUser } from "../Controller/authController"
const router = express.Router();

const verifyToken = async (req:any, res:any, next:any) =>{
    const getSession = req.headers["cookie"]

    if (!getSession)
    {
        return res.status(404).json({
            message: "please login to get token"
        })
    }
    const  tokencookies = getSession.split("=")[1]
    console.log("asdf", tokencookies)
    if(tokencookies)
    {
        const token = await tokencookies
        jwt.verify(token, "kode10xasdfghjkl", (error:any, payload:any)=>{
            if(error)
            {
                return res.status(404).json({
                    message: "token expires"
                })
            }
            req.user = payload
            next()
        })

    }else
    {
        return res.status(404).json({
            message: "please provide a valid token"
        })
    }
}

router.route("/create-user").post(upload, registerUser)
router.route("/login-user").post(login)
router.route("/logout-user").get(logOut)
router.route("/getall-user").get(verifyToken, gellAllUser)

export default router