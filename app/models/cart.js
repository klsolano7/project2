const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItems = new Schema({
  name: String,
  price: Number,
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Cart = mongoose.model("Cart", cartItems);

module.exports = Cart;
