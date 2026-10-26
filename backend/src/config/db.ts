import { Pool } from 'pg'
import { ENV } from './ENV'
import { userTable } from '../modules/user/user.table';
import { teamTable } from '../modules/team/team.table';

export const database = new Pool({
    user : ENV.DATABASE_USERNAME,
    host : ENV.DATABASE_HOST,
    database :  ENV.DATABASE_NAME,
    password : ENV.DATABASE_PASSWORD,
    port : ENV.DATABASE_PORT
})


export const connectDB = async() => {
    try {
       const promise = await database.connect();
       console.log("Database connection successfully : 🦣")
       return promise
    } catch (error : any) {
        console.log(`error : ${error.message}`);
        process.exit(1);
    }
}


export const createTable = async() => {
    try {
        await userTable()
        await teamTable()
        console.log("All Table Create Successfully : 📚")
    } catch (error : {message : string} | any) {
        console.error(`ERROR : ${error.message}`)
    }
}

