import { assert } from 'node:console'
import { httpServer } from './app'
import { ENV } from './config/ENV'
import { connectDB, createTable } from './config/db'
import { RedisConnection } from './redis/connection'


const port = ENV.PORT || 5001

httpServer.listen(port, async()=>{
    try {
        await connectDB()
        await createTable()
        await RedisConnection()
        console.log("app listen on port 🚢 : ", ENV.PORT)
    } catch (error : unknown) {
        console.log(`ERROR : ${error}`)
    }
})