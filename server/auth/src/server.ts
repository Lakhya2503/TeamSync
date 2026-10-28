import { configDotenv } from "dotenv";
import app from "./app.ts";
import ENV from "./config/ENV.ts";
import database from "./db/index.ts";
import { table } from "node:console";

configDotenv({
  path: ".env",
  quiet: true,
});

const server = () => {
  app.listen(ENV.PORT, () => {
    console.log(`APP LISTING ON PORT : http://localhost:${ENV.PORT}`);
  });
};

app.get("/api/health", async (req, res) => {
  try {
    const result = await database.query(
      "SELECT current_database() AS database",
    );
    res.json({
      success: true,
      message: "PostgreSQL connected!",
      database: result.rows[0].database,
    });
  } catch (error) {
    console.error("CONNECTION ERROR : ", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

server();
