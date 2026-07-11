import { io } from "socket.io-client"

const socketUrl: string = import.meta.env.VITE_SOCKET_URL || "http://localhost:5002"

export const useSocket = () => {

    const socket = null

    const socketConnect = () => {
        const newSocket = io(
            socketUrl,
            {
                withCredentials : true,
                transports : ['websocket'],
                reconnection : true,
                reconnectionDelay : 200,
                reconnectionAttempts: Infinity
            }
        )
    }
    
}

