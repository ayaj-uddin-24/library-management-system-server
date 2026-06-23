import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";

export class ReservationController {
  static async create(req: Request, res: Response) {
    const reservation = await ReservationService.createReservation(req.body);
    res.status(201).json({ success: true, data: reservation });
  }

  static async getByMember(req: Request, res: Response) {
    const reservations = await ReservationService.getMemberReservations(
      req.params.memberId,
    );
    res.status(200).json({ success: true, data: reservations });
  }
}
