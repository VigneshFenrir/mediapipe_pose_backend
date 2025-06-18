import { Router } from "express";
import {
  getImages,
  getImageById,
  deleteImage,
} from "../controllers/imageController.js";

const router = Router();

// GET /images - List all images
router.get("/images", getImages);

// GET /images/:id - Get a single image and its keypoints
router.get("/images/:id", getImageById);

// DELETE /images/:id - Delete the image and its keypoints
router.delete("/images/:id", deleteImage);

export default router;
