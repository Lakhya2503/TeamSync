import 'socket.io'
import { userType } from '../modules/user/user.interface'

declare module "socket.io" {
    interface Socket {
        user : userType
    }
}