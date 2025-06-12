import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOnOrder' }],
  cartTotal: { type: Number },
  orderStatus: { type: String, default: 'Not Process' },
  orderedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stripePaymentId: String,
  amount: Number,
  status: String,
  currentcy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
