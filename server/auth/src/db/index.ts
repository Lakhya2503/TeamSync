import { Pool } from "pg";
import ENV from "../config/ENV.ts";

const database = new Pool({
  host: ENV.DATABASE_HOST,
  password: ENV.DATABASE_PASSWORD,
  port: ENV.DATABASE_PORT,
  user: ENV.DATABASE_USERNAME,
  database: ENV.DATABASE_NAME,
});

database.on("error", () => {
  console.log("ERROR");
});

export default database;
