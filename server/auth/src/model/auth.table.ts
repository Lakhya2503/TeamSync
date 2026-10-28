import ApiError from "../config/ApiError.ts";
import database from "../db/index.ts";

const userTable = async () => {
  try {
    const query = `
          CREATE DATABASE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL,
                first_name VARCHAR(20) NOT NULL,
                last_name VARCHAR(20) NOT NULL,
                avatar TEXT NOL NULL,
                create_at DATE NOT NULL DEFAULT CURRENT_DATE
            )
    `;

    return await database.query(query);
  } catch (error) {
    console.log("USER TABLE ERROR", error.message);
    throw new ApiError(400, "user table didn't create");
  }
};

const refreshTokenTable = async () => {
  try {
    const query = `
          CREATE DATABASE IF NOT EXISTS refreshtoken (
                refreshtoken_id INT NOT NULL REFRENCES users(id),
                refreshTokenHash VARCHAR(50) NOT NULL,
                refreshTokenExpiry DATE NOT NULL
            )
    `;
    return await database.query(query);
  } catch (error) {
    console.log("REFRESH TOKEN TABLE ERROR", error.message);
    throw new ApiError(400, "refreshtoken table didn't create");
  }
};

export { userTable, refreshTokenTable };
