import { UserType } from "../modules/user/user.type"

export const USER_TYPE : UserType = {
    ADMIN : "Admin",
    MANAGER : "Manager",
    MEMBER : "Member"
}

export const USER_TYPE_ENUM = Object.values(USER_TYPE)

