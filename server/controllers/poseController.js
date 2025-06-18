import { Image } from "../models/Image.js";
// import { Keypoint } from "../models/Keypoint.js";
import { Keypoint } from "../models/keyPoint.js";
import { v4 as uuid } from "uuid";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export const extractPose = async (req, res, next) => {
  try {
    if (!req.files?.file)
      return res.status(400).json({ error: "Image required" });

    const img = req.files.file;
    const imgId = uuid();
    const imgPath = path.join("uploads", `${imgId}_${img.name}`);

    const uploadDir = path.join("uploads");
    //     // Create uploads folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    await img.mv(imgPath);

    const python = spawn("python", [
      "python/pose_extract.py",
      "--image",
      imgPath,
    ]);
    let data = "";
    for await (const chunk of python.stdout) data += chunk;
    const keypoints = JSON.parse(data);

    const sqlRow = await Keypoint.create({ points: keypoints });
    const mongoDoc = await Image.create({
      _id: imgId,
      sqlId: sqlRow.id,
      path: imgPath,
    });

    res
      .status(201)
      .json({ imageId: mongoDoc._id, sqlId: sqlRow.id, keypoints });
  } catch (e) {
    next(e);
  }
};
