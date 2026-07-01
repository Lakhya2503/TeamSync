import { database } from "../../config/db";
import { USER_TYPE } from "./user.type";

export const userTable = async() => {
    try {
        const userQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(100) NOT NULL CHECK (char_length(name) >= 3),
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                avatar TEXT DEFAULT NULL,
                refreshToken TEXT DEFAULT NULL,
                role VARCHAR(10) DEFAULT '${USER_TYPE.USER}' CHECK (role IN('${USER_TYPE.ADMIN}','${USER_TYPE.USER}')),
                reset_password_token TEXT DEFAULT NULL,
                reset_password_token_expiry TEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT now()
            )
        `
        await database.query(userQuery);
        console.log("User Table Create Or Fetch Successfully : 👤🗃️")
    } catch (error : {message : string} | any) {
        console.error(`CREATE TABLE ERROR: ${error.message}`)
    }
}
