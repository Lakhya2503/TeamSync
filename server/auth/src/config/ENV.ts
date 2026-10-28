import { configDotenv } from "dotenv";
configDotenv({
  path: ".env",
  quiet: true,
});

const ENV: {
  PORT: number | undefined;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_USER: string;
  DATABASE_PORT: number | undefined;
} = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  DATABASE_NAME: String(process.env.DATABASE_NAME),
  DATABASE_PASSWORD: String(process.env.DATABASE_PASSWORD),
  DATABASE_USER: String(process.env.DATABASE_USER),
  DATABASE_PORT: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT)
    : undefined,
};

export default ENV;
