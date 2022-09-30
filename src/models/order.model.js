const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number },
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
    }
  },
  {
    timestamps: true
  }
);

exports.Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
