import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowing extends Document {
  member: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  issuedBy: mongoose.Types.ObjectId; // Librarian/Admin who issued
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue" | "lost";
  fineAmount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BorrowingSchema = new Schema<IBorrowing>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    issuedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["active", "returned", "overdue", "lost"],
      default: "active",
    },
    fineAmount: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true },
);

BorrowingSchema.index({ member: 1, status: 1 });
BorrowingSchema.index({ book: 1, status: 1 });
BorrowingSchema.index({ dueDate: 1, status: 1 });

export const Borrowing = mongoose.model<IBorrowing>(
  "Borrowing",
  BorrowingSchema,
);
