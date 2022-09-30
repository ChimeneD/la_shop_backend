const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
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

exports.Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
