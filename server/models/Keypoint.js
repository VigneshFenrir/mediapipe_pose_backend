import { DataTypes } from "sequelize";
import { sql } from "../config/database.js";
import env from "../config/env.js";

export const Keypoint = sql.define("keypoint", {
  points: {
    type: env.SQL_DIALECT === "mysql" ? DataTypes.JSON : DataTypes.JSONB,
    allowNull: false,
  },
});
