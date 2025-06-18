import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import env from "./env.js";

// Sequelize for SQL (PostgreSQL or MySQL)
export const sql = new Sequelize(env.SQL_DB, env.SQL_USER, env.SQL_PASS, {
  host: env.SQL_HOST,
  port: env.SQL_PORT,
  dialect: env.SQL_DIALECT,
  logging: false,
});

// MongoDB via Mongoose
export const initSQL = async () => {
  try {
    await sql.authenticate();
    console.log("SQL connection established.");
  } catch (err) {
    console.error("SQL connection failed:", err);
  }
};

export const initMongo = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};
