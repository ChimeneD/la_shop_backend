const mongoose = require("mongoose");

const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    product: {
      type: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    },
    stock: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

exports.Inventory =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
