import mongoose from "mongoose";
export const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    _id: { type: String, required: true },
    sqlId: { type: Number, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);
