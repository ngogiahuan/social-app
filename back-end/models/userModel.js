const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 30,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "male",
    },
    address: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    avatar: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
