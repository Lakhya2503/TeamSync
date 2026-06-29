import Redis from 'ioredis'
import { ENV } from '../config/ENV'
import { REDIS_EVENT } from '../constant/comman';

const client = new Redis(ENV.REDIS_URL, { lazyConnect : true })
let isConnected : boolean = false;

export const RedisConnection = async() => {
    try {
         client.on(REDIS_EVENT.ERROR, (error : unknown)=>{
            console.error(`REDIS CONNECTION ERROR : ${error}`)
        })

        // TODO : WHEN YOU WAN'T TO USE PUB, SUB THEN DECLARE ERRORS HERE
        
        await Promise.all([
            client.connect()
            // ?? YOU CAN ALSO ADD PUB, SUB 
        ])

        console.log("Redis Connecting Successfully : 🏎️ ")

        isConnected = true;

        return {
            client,
            isConnected
        }
    } catch (error:{message : string} | any){
        console.error(`REDIS CONNECTION ERROR : ${error.message}`)
    }
}


export {
    client,
    isConnected
}