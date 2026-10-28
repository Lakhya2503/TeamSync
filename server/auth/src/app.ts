import express from "express";
import ENV from "./config/ENV.ts";

const app = express();

console.log("PORT", ENV.PORT);

app.get("/", (req, res) => {
   res.send(`AUTH LISTEN ON PORT ${ENV.PORT}`);
});

export default app;
