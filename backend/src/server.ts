import { assert } from 'node:console'
import { httpServer } from './app'
import { ENV } from './config/ENV'
import { connectDB } from './config/db'


const port = ENV.PORT || 5001

httpServer.listen(port, async()=>{
    try {
        await connectDB()
        // redis await connect()
        console.log(`app listen on port : ${ENV.PORT}`)
    } catch (error : any) {
        console.log(`ERROR : ${error.message}`)
    }
})