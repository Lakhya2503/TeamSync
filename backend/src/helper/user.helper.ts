import { database } from "../config/db";
// import { getUser } from "../redis/cache"
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";

export const requiredFiled = (filed: string[]) => {
  filed.some((f: string) => {
    if (f.trim() === "" || f === undefined) {
      throw new ApiError(400, "All fileds are required");
    }
  });
};

// export const fetchUser = async (userId: string) => {
//   // let user = await getUser(userId)
//   let user;

//   if (!user) {
//     user = await database.query("SELECT * FROM users WHERE id = $1", [userId]);
//   }

//   return user.rows[0];
// };

export const fetchUser = async (key: string, value: string | number) => {
  console.log(`${key} : ${value}`);
  try {
    let user = await database.query(
      `
             SELECT id,name,email, avatar,role,isverified FROM users WHERE ${key} = $1
       `,
      [value]
    );
    console.log("user", user.rows[0]);
    return user.rows[0];
  } catch (error) {
    throw new ApiError(404, "user not found");
  }
};

export const passwordChecker = async (userId: number, password: string) => {
  try {
    let userPassword: { password: string } = (
      await database.query(
        `
                  SELECT "password" FROM users WHERE id = $1
           `,
        [userId]
      )
    ).rows[0];

    console.log("Case 1");
    console.log("password : ", password);
    console.log("userPassword.password: ", userPassword.password);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userPassword.password
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
    console.log("Case 2");
  } catch (error) {
    throw new ApiError(401, "Creadential faild....");
  }
};
