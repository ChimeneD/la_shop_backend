const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "user" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    emailToken: { type: String },
    verified: { type: Boolean, required: true, default: false },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true
  }
);

exports.User = mongoose.models.User || mongoose.model("User", userSchema);
