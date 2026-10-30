import ApiError from "../config/ApiError.ts";
import database from "../db/index.ts";

const fetchQuery = async (key: string | number, value: string | number) => {
  const query = `
     SELECT id, username, first_name, last_name , email FROM users WHERE  ${key}=$1
     `;

  const result = await database.query(query, [value]);
  return result.rows[0];
};

const databasePassword = async (id: number) => {
  const query = `
     SELECT password FROM users WHERE  id=$1
     `;

  const result = await database.query(query, [id]);
  return result.rows[0];
};

export { fetchQuery, databasePassword };
