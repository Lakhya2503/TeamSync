import ApiError from "../config/ApiError.ts";

const userTable = async () => {
  try {
    const query = `
          CREATE DATABASE IF NOT EXISTS (
                id INT SERIAL 
            )
    `;
  } catch (error) {
    throw new ApiError(400, "user table didn't create");
  }
};

const createRefreshAccessToken = async () => {};

export { userTable, createRefreshAccessToken };
