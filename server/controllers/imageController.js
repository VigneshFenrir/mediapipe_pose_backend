import path from "path";
import fs from "fs";
import { Image } from "../models/Image.js";
import { Keypoint } from "../models/keyPoint.js";

// Get all images
export const getImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
};

// Get one image with SQL keypoints
export const getImageById = async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ error: "Not found" });

  const keypoints = await Keypoint.findByPk(image.sqlId);
  res.json({ ...image.toObject(), keypoints });
};

// Delete image and keypoints
export const deleteImage = async (req, res) => {
  const image = await Image.findByIdAndDelete(req.params.id);
  if (!image) return res.status(404).json({ error: "Not found" });

  await Keypoint.destroy({ where: { id: image.sqlId } });
  fs.unlinkSync(image.path); // delete the image file also from disk

  res.status(204).send({ message: "successfully deleted" });
};
