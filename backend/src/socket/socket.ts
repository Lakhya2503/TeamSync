import jwt from 'jsonwebtoken'
import { COMMAN_SCOKET_EVENT } from '../constant/socketEvents';

export const intializeSocketIO = (io:any) => {
    return io.on(COMMAN_SCOKET_EVENT.CONNECTION, async(socket:any)=>{

        


    })
}


export const emitSocketEvent = (req:any, roomId:String, event:String, payload:Object) => {
    req.app.get("io").in(roomId).emit(event,payload);
}