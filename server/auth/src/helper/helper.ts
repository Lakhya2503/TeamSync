import ApiError from "../config/ApiError.ts";
import database from "../db/index.ts";

const fetchQuery = async (key: string | number, value: string | number) => {
  const query = `
     SELECT id, username, first_name, last_name , email FROM where ${key} =$1
     `;

  return await database.query(query, [value]);
};

export { fetchQuery };
