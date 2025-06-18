import { Router } from "express";
import { extractPose } from "../controllers/poseController.js";
const r = Router();

r.post("/extract-pose", extractPose);
export default r;
