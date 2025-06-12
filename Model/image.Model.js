import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  asset_id: String,
  public_id: String,
  url: String,
  secure_url: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
