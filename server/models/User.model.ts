import mongoose from "mongoose";
import crypto, { CipherGCMTypes, CipherKey } from "crypto";

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

// encrypt password using HMAC
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const algorithm: CipherGCMTypes = "aes-256-gcm";
  const iv: Buffer = Buffer.alloc(16, 0);
  const securityKey: CipherKey = crypto.randomBytes(32);

  const cipher = crypto.createCipheriv(algorithm, securityKey, iv);

  let encryptedPassword = cipher.update(this.password, "utf8", "hex");

  encryptedPassword += cipher.final("hex");

  this.password = encryptedPassword;
});

export default mongoose.model("User", UserSchema);
