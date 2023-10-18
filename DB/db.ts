import mongoose from "mongoose"

const url:string = "mongodb://localhost:27017/AuthAPI"

mongoose.connect(url).then(()=>{
    console.log("databased connected successfully")
}).catch((error:any)=>{
    console.log("an error occured", error)
})

export default mongoose