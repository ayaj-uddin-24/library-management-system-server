import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  memberId: string; // Custom ID like LIB-MEM-0001
  user: mongoose.Types.ObjectId; // Reference to User
  address: string;
  photo?: string;
  membershipType: "regular" | "premium" | "student";
  membershipExpiry: Date;
  status: "active" | "suspended" | "expired";
  borrowingLimit: number;
  currentBorrowedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    memberId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: String, required: true },
    photo: { type: String },
    membershipType: {
      type: String,
      enum: ["regular", "premium", "student"],
      default: "regular",
    },
    membershipExpiry: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "suspended", "expired"],
      default: "active",
    },
    borrowingLimit: { type: Number, default: 3 },
    currentBorrowedCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

MemberSchema.index({ user: 1 });

export const Member = mongoose.model<IMember>("Member", MemberSchema);
