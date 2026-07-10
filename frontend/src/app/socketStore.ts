import { io } from "socket.io-client"






export const useSocket = () => {

    const socket = null

    const socketConnect = () => {
        const newSocket = io(
            import.meta.env.BASE_URL,
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

