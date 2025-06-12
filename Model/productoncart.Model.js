import mongoose from "mongoose";

const productOnCartSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  count: Number,
  price: Number,
});

const ProductOnCart = mongoose.model("ProductOnCart", productOnCartSchema);
export default ProductOnCart;
