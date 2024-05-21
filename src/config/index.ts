import { config } from "dotenv";
config({ path: `.env.development.local` });

export const CREDENTIALS: boolean = process.env.CREDENTIALS === "true";
export const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  PORT,
  JWT_SECRET_KEY,
  TOKEN_HEADER_KEY,
} = process.env;
