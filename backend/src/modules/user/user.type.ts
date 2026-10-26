import { auth_userType, teamUserType } from "./user.interface";

export const TEAM_USER_TYPE: teamUserType = {
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
};

export const USER_TYPE: auth_userType = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
};
