import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";

export class ReservationController {
  static async create(req: Request, res: Response) {
    const reservation = await ReservationService.createReservation(req.body);
    res.status(201).json({ success: true, data: reservation });
  }

  static async getByMember(req: Request, res: Response) {
    const memberId = req.params.memberId as string; // ← Fixed here

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required",
      });
    }

    const reservations =
      await ReservationService.getMemberReservations(memberId);

    res.status(200).json({
      success: true,
      data: reservations,
    });
  }
}
