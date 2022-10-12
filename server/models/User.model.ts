import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please add username"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign({ id: this._id }, "thisismysecret", { expiresIn: "30 days" });
};

export declare interface IUser extends InferSchemaType<typeof UserSchema> {
  getSignedJwtToken(): string;
}

export default mongoose.model<IUser>("User", UserSchema);
