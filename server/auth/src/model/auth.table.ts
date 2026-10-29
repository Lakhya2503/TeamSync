import ApiError from "../config/ApiError.ts";
import database from "../db/index.ts";

const userTable = async () => {
  try {
    const query = `
          CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(username) > 3),
                first_name VARCHAR(20) NOT NULL,
                last_name VARCHAR(20) NOT NULL,
                avatar TEXT,
                create_at DATE NOT NULL DEFAULT CURRENT_DATE
            )
    `;

    const result = await database.query(query);
    console.log("USER TABLE CREATE SUCCESSFULLY");
    return result;
  } catch (error) {
    console.log("USER TABLE ERROR", error.message);
    throw new ApiError(400, "user table didn't create");
  }
};

const refreshTokenTable = async () => {
  try {
    const query = `
          CREATE TABLE IF NOT EXISTS refreshtoken (
              id SERIAL NOT NULL,
              user_id INT NOT NULL REFERENCES users(id),
              refreshTokenHash VARCHAR(50) NOT NULL,
              refreshTokenExpiry DATE NOT NULL
            )
    `;
    const result = await database.query(query);
    console.log("REFRESH TABLE CREATE SUCCESSFULLY");
    return result;
  } catch (error) {
    console.log("REFRESH TOKEN TABLE ERROR", error.message);
    throw new ApiError(400, "refreshtoken table didn't create");
  }
};

export { userTable, refreshTokenTable };
