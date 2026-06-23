import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  photo?: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["super_admin", "admin", "librarian", "member"],
      default: "member",
    },
    phone: { type: String },
    photo: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    refreshToken: { type: String },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
