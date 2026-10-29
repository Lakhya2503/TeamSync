import express from "express";
import ENV from "./config/ENV.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

console.log("PORT", ENV.PORT);

app.get("/", (req, res) => {
  res.send(`AUTH LISTEN ON PORT ${ENV.PORT}`);
});

import AuthRouter from "./routes/auth.route.ts";
import HealthRouter from "./routes/health.route.ts";

app.use("/api/health", HealthRouter);
app.use("/api/auth", AuthRouter);

export default app;
