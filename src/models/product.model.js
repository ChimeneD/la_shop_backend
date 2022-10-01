const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    imageID: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    feature: { type: Boolean, required: true, default: false },
    featureImage: { type: String },
    featureImageID: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    inventory: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Inventory"
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

exports.Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
