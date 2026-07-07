import express from "express";
import cors from 'cors'
import { ENV } from "./config/ENV.js";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser'
import { createServer } from "http";
const app = express()
const httpServer = createServer(app)


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

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true, limit : "20kb"}))

app.use("/api/v1/tms/health",(req:any, res:any)=>{
    res.status(200).json({
        statusCode : 200,
        success : true,
        response : "App Health Was Good"
    })
})


// APP ROUTE DIFIEND HERE
import AuthRouter from './modules/user/user.route.js'
import { intializeSocketIO } from "./socket/socket.js";


// APP ROUTER USE HERE
app.use("/api/v1/tms/auth", AuthRouter)


intializeSocketIO(io)

// TODO : DEFINED THIS ERROR AND RESPONSES TYPE DECLEARE LATER ON

app.use((err:any, req: any, res:any, next:any) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
});



export {
    httpServer,
    app
}