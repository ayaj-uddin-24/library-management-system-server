import { Reservation } from "../models/Reservation.model";
import { AppError } from "../middlewares/error.middleware";

export class ReservationService {
  static async createReservation(data: any) {
    return Reservation.create(data);
  }

  static async getMemberReservations(memberId: string) {
    return Reservation.find({ member: memberId }).populate("book");
  }
}
