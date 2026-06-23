import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  member: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  reservationDate: Date;
  expiryDate: Date;
  status: "active" | "fulfilled" | "cancelled" | "expired";
}

const ReservationSchema = new Schema<IReservation>(
  {
    member: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    reservationDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "fulfilled", "cancelled", "expired"],
      default: "active",
    },
  },
  { timestamps: true },
);

export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema,
);
