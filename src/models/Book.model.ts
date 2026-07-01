import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  isbn: string;
  barcode: string;
  title: string;
  subtitle?: string;
  author: string;
  coAuthors?: string[];
  publisher: string;
  edition: string;
  language: string;
  category: string;
  description?: string;
  keywords?: string[];
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  coverImage?: string;
  pdfAttachment?: string;
  price?: number;
  status: "available" | "issued" | "reserved" | "lost" | "damaged";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    barcode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    author: { type: String, required: true, trim: true },
    coAuthors: [{ type: String, trim: true }],
    publisher: { type: String, required: true, trim: true },
    edition: { type: String, required: true },
    language: { type: String, default: "English" },
    category: { type: String, required: true },
    description: { type: String },
    keywords: [{ type: String }],
    totalCopies: { type: Number, required: true, min: 1 },
    availableCopies: { type: Number, required: true, min: 0 },
    shelfLocation: { type: String, required: true },
    coverImage: { type: String },
    pdfAttachment: { type: String },
    price: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ["available", "issued", "reserved", "lost", "damaged"],
      default: "available",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Indexes for performance
BookSchema.index({ title: "text", author: "text", isbn: "text" });
BookSchema.index({ category: 1 });
BookSchema.index({ status: 1 });

export const Book = mongoose.model<IBook>("Book", BookSchema);
