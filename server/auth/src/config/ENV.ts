import { configDotenv } from "dotenv";
configDotenv({
  path: ".env",
  quiet: true,
});

const ENV: {
  PORT: number | undefined;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_USERNAME: string;
  DATABASE_PORT: number | undefined;
  DATABASE_HOST: string;
  FRONTEND_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
} = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  DATABASE_NAME: String(process.env.DATABASE_NAME),
  DATABASE_PASSWORD: String(process.env.DATABASE_PASSWORD),
  DATABASE_USERNAME: String(process.env.DATABASE_USERNAME),
  DATABASE_PORT: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT)
    : undefined,
  DATABASE_HOST: String(process.env.DATABASE_HOST),
  FRONTEND_URL: String(process.env.FRONTEND_URL),
  ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
  ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
  REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
};

export default ENV;
