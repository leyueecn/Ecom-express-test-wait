import mongoose from "mongoose";

const productOnOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  count: Number,
  price: Number,
});

const ProductOnOrder = mongoose.model("ProductOnOrder", productOnOrderSchema);
export default ProductOnOrder;
