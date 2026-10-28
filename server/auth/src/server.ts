import { configDotenv } from "dotenv";
import app from "./app.ts";
import ENV from "./config/ENV.ts";

configDotenv({
  path: ".env",
  quiet: true,
});

const server = () => {
  app.listen(ENV.PORT, () => {
    console.log(`APP LISTING ON PORT : http://localhost:${ENV.PORT}`);
  });
};

server();
