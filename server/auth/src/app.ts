import express from "express";
import ENV from "./config/ENV.ts";

const app = express();

console.log("PORT", ENV.PORT);

app.get("/", (req, res) => {
  res.send(`AUTH LISTEN ON PORT ${ENV.PORT}`);
});

import AuthRouter from "./routes/auth.route.ts";

app.use("/auth", AuthRouter);

export default app;
