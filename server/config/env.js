import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const env = {
  // SQL
  SQL_DIALECT: process.env.SQL_DIALECT || "postgres",
  SQL_HOST: process.env.SQL_HOST || "localhost",
  SQL_PORT: parseInt(process.env.SQL_PORT, 10) || 5432,
  SQL_DB: process.env.SQL_DB || "pose_db",
  SQL_USER: process.env.SQL_USER || "pose_user",
  SQL_PASS: process.env.SQL_PASS || "",

  // Mongo
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/pose_db",

  // Backup Folder
  BACKUP_DIR: process.env.BACKUP_DIR || "backup",

  // Email
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  MAIL_FROM: process.env.MAIL_FROM || "from@email.com",
  MAIL_TO: process.env.MAIL_TO || "to@email.com",
  MAIL_SERVICE: process.env.MAIL_SERVICE || "gmail",
  MAIL_PASS: process.env.MAIL_PASS || "aaabbbababababa",

  // Server
  PORT: parseInt(process.env.PORT, 10) || 4000,

  // Python service
  PY_EXTRACTOR_URL: process.env.PY_EXTRACTOR_URL,
};

export default env;
