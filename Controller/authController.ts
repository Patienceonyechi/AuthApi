import authModel from "../Model/authModel"
import express,{Request,Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser= async (req:Request, res:Response):Promise<Response>=>{
    try
    {
      const {fullName, email, password} = req.body
      if (!fullName || !email || !password)
      {
        return res.status(404).json({
            success:0,
            message: "all filed required"
        })
      }
      const checkEmail = await authModel.findOne({email})
      console.log(checkEmail)
      if (checkEmail)
      {
        return res.status(401).json({
            success: 0,
            message: "email already exist"
        })
      }
      console.log("mywordisbig", req.file)
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password,salt)

      const createUser = await authModel.create({
        email,
        password,
        fullName, 
        profileImage: req.file.filename
      })
      return res.status(201).json({
        success: 1,
        message: "registration complete",
        data: createUser
      })
    }catch(error:any)
    {
      return res.status(401).json({
        message: error.message
      })
    }
}

export  const login = async (req:Request, res:Response):Promise<Response>=> {
  try
  {
      const {email, password} = req.body
      if (!email || !password)
      {
          return res.status(401).json({
              message: "all field required"
          })
      }
      const checkEmail:any = await authModel.findOne({email: email})
      console.log(checkEmail)
      if (checkEmail)
      {
          const checkPassword = await bcrypt.compare(password, checkEmail.password)
          if (checkPassword)
          {
              const token = jwt.sign(
                  {_id: checkEmail._id, fullName: checkEmail.fullName, },
                  "kode10xasdfghjkl",
                  {expiresIn: "10m"}
              )
              console.log(token)
             const  {password, isActive, ...info} = checkEmail._doc
             const options:any = {expiresIn: "15m"}
             res.cookie("sessonid", token, options)
             return res.status(200).json({
              message: "log in successfully",
              result:{info, token}
             })
          }else
          {
              return res.status(401).json({
                  message: "incorrect password"
              })
          }
      }else
      {
          return res.status(401).json({
              message: "user not found"
          })
      }
  }catch(error:any)
  {
        return res.status(400).json({
  
              error:error.message
          })
      
  }
}

export const logOut  = async (req:Request, res:Response)=>{
  try
  {
      res.clearCookie("sessionId")
      return res.status(401).json({
          message: "log out successfully"
      })

  }catch(error:any)
  {
      return res.status(400).json({error:error.message})
  }
}
export const gellAllUser = async (req:Request, res:Response):Promise<Response> => {
  try{
      const data = await authModel.find()
      return res.status(200).json({
          message: "successfully retrieved",
          data:data
      })


  }catch(error:any)
  {
      return res.status(404).json({
          message:error.message
})
}
}