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

app.use("/api/v1/tms/health",(req:any, res:any)=>{
    res.status(200).json({
        statusCode : 200,
        success : true,
        response : "App Health Was Good"
    })
})


// APP ROUTE DIFIEND HERE




// APP ROUTER USE HERE




app.use((err:any, req: any, res:any, next:any) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
});


// Global error handler middleware (Always returns JSON)
app.use((err:any, req: any, res:any, next:any) => {
  // Catch MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already registered. Please login."
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


export {
    httpServer,
    app
}