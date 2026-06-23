import mongoose, { Schema, Document } from "mongoose";

export interface IFine extends Document {
  borrowing: mongoose.Types.ObjectId;
  member: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "paid" | "waived";
  paidAt?: Date;
}

const FineSchema = new Schema<IFine>(
  {
    borrowing: {
      type: Schema.Types.ObjectId,
      ref: "Borrowing",
      required: true,
    },
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "waived"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

export const Fine = mongoose.model<IFine>("Fine", FineSchema);
