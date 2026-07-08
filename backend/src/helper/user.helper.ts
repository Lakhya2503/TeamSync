import { database } from "../config/db"
import { getUser } from "../redis/cache"
import { ApiError } from "../utils/ApiError"


export const requiredFiled = (filed : string[]) => {
    filed.some((f : string) => {
        if(f.trim() === "" || f === undefined) {
             throw new ApiError(400, "All fileds are required")
        }
    })
}

export const fetchUser = async(userId:string) => {
    let user = await getUser(userId)

    if(!user) {
        user = await database.query(
            "SELECT * FROM users WHERE id = $1",[userId]
        )
    }

    return user.rows[0]
}

