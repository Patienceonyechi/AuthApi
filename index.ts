import "./DB/db"
import express from "express"
import cors from "cors"
import authRouter from "./Router/authRouter"
import morgan from "morgan"

const port:number = 2000
const app = express()

app.use(express.json())
app.use("/api/v1", authRouter)
app.use(cors())
app.use(morgan('dev'))

app.use("/uploads", express.static("uploads"))

const server = app.listen(port, ()=>{
    console.log(`i am listening from port:${port}`)
})

process.on("uncaughtException", (error:Error)=>{
    console.log("stop here: uncaughtException")
    console.log(error)
    process.exit(1)
})

process.on("unhandledRejection", (reason:any)=>{

    console.log("stop here: unhandleRejection")
    console.log(reason)

    server.close(()=>{
        process.exit(1)
    })
})