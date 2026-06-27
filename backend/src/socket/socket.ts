import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { COMMAND_SCOKET_EVENT } from '../socket/socket.ts'

export const intializeSocketIO = (io:any) => {
    return io.on(COMMAND_SCOKET_EVENT.CONNECTION, async(socket:any)=>{
        
    })
}


export const emitSocketEvent = (req:any, roomId:String, event:String, payload:Object) => {
    req.app.get("io").in(roomId).emit(event,payload);
}