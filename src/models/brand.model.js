const mongoose = require("mongoose");

const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product"
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

exports.Brand =
  mongoose.models.Brand || mongoose.model("Brand", brandSchema);
