import { Router } from "express";
import database from "../db/index.ts";

const router = Router();

router.route("/").get(async (req, res) => {
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

export default router;
