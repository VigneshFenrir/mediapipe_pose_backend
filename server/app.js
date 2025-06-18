import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { initSQL, initMongo, sql } from "./config/database.js";
import poseRoutes from "./routes/pose.js";
import imageRoutes from "./routes/images.js";
import "./jobs/backupJob.js"; // cron
// import { Keypoint } from "./models/Keypoint.js";

await initSQL();
await sql.sync(); //for sync the sql
await initMongo();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());

app.use("/", poseRoutes);
app.use("/", imageRoutes);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`API listening on :${process.env.PORT || 4000}`)
);
