import express from "express";
import cors from 'cors'
import { ENV } from "./config/ENV.js";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser'
import { createServer } from "http";
import { intializeSocketIO } from "./socket/socket.js";
import morgan from 'morgan'


const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    pingTimeout : 60000,
    cors : {
        origin : [
            ENV.CORS_ORIGIN,
            ENV.SOCKET_ORIGIN,
        ],
        credentials : true,
        methods: ["POST","GET","PUT","PATCH","DELETE","OPTIONS"]
    },
})


app.set("io",io)
app.use(express.static("public"));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true, limit : "20kb"}))


app.use(cors({
    origin : [
        ENV.CORS_ORIGIN,
        ENV.SOCKET_ORIGIN,
    ],
    credentials : true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders : [
      "Authorization",
      "Content-Type"
    ]
}))



app.use("/api/v1/tms/health",(req:any, res:any)=>{
    res.status(200).json({
        statusCode : 200,
        success : true,
        response : "App Health Was Good"
    })
})

app.use(morgan('dev'))


// APP ROUTE DIFIEND HERE
import AuthRouter from './modules/user/user.route.js'


// APP ROUTER USE HERE
app.use("/api/v1/teamsync/auth", AuthRouter)


app.use((req,res)=>{
    return res.json(
        {
            status : 404,
            message : "page not found"
        }
    )
})

intializeSocketIO(io)

export {
    httpServer,
    app
}