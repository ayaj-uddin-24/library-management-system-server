import { Reservation } from "../models/Reservation.model";
import { AppError } from "../middlewares/error.middleware";

export class ReservationService {
  static async createReservation(data: any) {
    return Reservation.create(data);
  }

  static async getMemberReservations(memberId: string) {
    if (!memberId) {
      throw new AppError("Member ID is required", 400);
    }
    return Reservation.find({ member: memberId }).populate(
      "book",
      "title author isbn",
    );
  }
}
