import { Pool } from 'pg'
import { ENV } from './ENV'

const database = new Pool({
    user : ENV.DATABASE_USERNAME,
    host : ENV.DATABASE_HOST,
    database :  ENV.DATABASE_NAME,
    password : ENV.DATABASE_PASSWORD,
    port : ENV.DATABASE_PORT
})


export const connectDB = async() => {
    try {
       await database.connect();
    } catch (error : any) {
        console.log(`error : ${error.message}`);
        process.exit(1);
    }
}

