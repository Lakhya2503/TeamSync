import { configDotenv } from "dotenv";
import app from "./app.ts";
import ENV from "./config/ENV.ts";
import table from "./db/table.ts";
import ApiError from "./config/ApiError.ts";

configDotenv({
  path: ".env",
  quiet: true,
});

const server = () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(`APP LISTING ON PORT : http://localhost:${ENV.PORT}`);
    });
    table();
  } catch (error) {
    throw new ApiError(500, `${error.message}`);
  }
};

server();
