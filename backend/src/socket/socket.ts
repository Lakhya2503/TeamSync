import * as cookie from "cookie";
import jwt from 'jsonwebtoken'
import { COMMAN_SOCKET_EVENT } from '../constant/socketEvents';
import {Server, Socket } from 'socket.io';
import { ApiError } from "../utils/ApiError";
import { ENV } from "../config/ENV";
import { fetchUser } from "../helper/user.helper";
import { accessTokenUserData, userType } from "../modules/user/user.interface";

export const intializeSocketIO = (io:Server) => {
    return io.on(COMMAN_SOCKET_EVENT.CONNECTION, async(socket: Socket)=>{
        try {
            const cookies = cookie.parse(socket.handshake.headers?.cookie)
            let token = cookies.accessToken

            if(!token) {    
                token = socket.headers("Authorization").replace("Bearer", "")
            }

            if(!token) {
                token = socket.handshake.auth?.token
            }

            if(!token) {
                throw new ApiError(401,"Token Expired ❗")
            }

            const decodedToken = jwt.verify(
                token,
                ENV.ACCESS_TOKEN_SECRET
            ) as jwt.JwtPayload & accessTokenUserData;

            if(!decodedToken) {
                throw new ApiError(401, "Token Used Or Expired")
            }

            const user:userType = await fetchUser(decodedToken.id)

            if(!user){
                throw new ApiError(401,"Token Expired or Invalid")
            }

            socket.user = user;

            socket.join(socket.user.id.toString())
            socket.emit(COMMAN_SOCKET_EVENT.CONNECT);
            console.log(`🤝 USER CONNECTED | USER : ${socket.user.name}`);

            // mount other functions here


            socket.on(COMMAN_SOCKET_EVENT.DISCCONECT, ()=>{
                console.log("🚨 USER DISS-CONNECTED USER : ", user.name);
                // if (socket.docId) {
                // socket.to(socket.docId).emit(DOCUMENT_EVENT.USER_LEFT, {
                //     messag: `${socket.user.fullName} was offine`,
                //     userId: socket.user._id,
                // });
                // }
                socket.leave(socket.user.id.toString());
            })
        } catch (error : any ) {
             socket.emit(
                COMMAN_SOCKET_EVENT.SOCKET_ERROR,
                error || "Something went wrong"
            );
        }
    })
}


export const emitSocketEvent = (req:any, roomId:String, event:String, payload:Object) => {
    req.app.get("io").in(roomId).emit(event,payload);
}