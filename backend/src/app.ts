import express from "express";
import cors from 'cors'
import { ENV } from "./config/ENV.js";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser'
import { createServer } from "http";
import { intializeSocketIO } from "./socket/socket.js";


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


// APP ROUTE DIFIEND HERE
import AuthRouter from './modules/user/user.route.js'


// APP ROUTER USE HERE
app.use("/api/v1/teamsync/auth", AuthRouter)



intializeSocketIO(io)

export {
    httpServer,
    app
}