import { ApiError } from "../utils/ApiError"


export const requiredFiled = (filed : string[]) => {
    filed.some((f : string) => {
        if(f.trim() === "" || f === undefined) {
             throw new ApiError(400, "All fileds are required")
        }
    })
}

export const fetchUser = () => {
    
}