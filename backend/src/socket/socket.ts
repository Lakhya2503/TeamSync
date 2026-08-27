import cookie from "cookie";
import jwt from "jsonwebtoken";
import { COMMAN_SOCKET_EVENT } from "../constant/socketEvents";
import { Server, Socket } from "socket.io";
import { ApiError } from "../utils/ApiError";
import { ENV } from "../config/ENV";
import { fetchUser } from "../helper/user.helper";
import { accessTokenUserData } from "../modules/user/user.interface";

export const intializeSocketIO = (io: Server) => {
  return io.on("connection", async (socket: Socket) => {
    try {
      let token : string | null = null;
      console.log("token",token)

      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      console.log("cookies", cookies);

      if (cookies.accessToken) {
        token = cookies.accessToken;
      }

      const authHeader = socket.handshake.headers.authorization;

      if (!token && authHeader?.startsWith("Bearer ")) {
        token = authHeader.slice(7);
      }

      if (!token) {
        throw new ApiError(401, "Access token not found");
      }

      const decodedToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as accessTokenUserData
      
      const user = await fetchUser(decodedToken.id)

      socket.user = user

      socket.join(socket.user.id.toString());
      socket.emit("connected")

      socket.on(COMMAN_SOCKET_EVENT.DISCCONECT, () => {
        console.log("🚨 USER DISS-CONNECTED USER : ", user.name);
        // if (socket.docId) {
        // socket.to(socket.docId).emit(DOCUMENT_EVENT.USER_LEFT, {
        //     messag: `${socket.user.fullName} was offine`,
        //     userId: socket.user._id,
        // });
        // }
        socket.leave(socket.user.id.toString());
      });
    } catch (error) {
      console.log("error", error);
      socket.emit(
        COMMAN_SOCKET_EVENT.SOCKET_ERROR,
        error || "Something went wrong"
      );
    }
  });
};

export const emitSocketEvent = (
  req: any,
  roomId: String,
  event: String,
  payload: Object
) => {
  req.app.get("io").in(roomId).emit(event, payload);
};
