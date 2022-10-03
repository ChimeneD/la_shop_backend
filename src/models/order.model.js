const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        totalPrice: { type: Number }
      }
    ],
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: String }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    paid: {type: Boolean, required: true, default: false},
    isDelivered: {type: Boolean, required: true, default: false},
    paymentMethod: {type: String, required: true},
  },
  {
    timestamps: true
  }
);

exports.Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
