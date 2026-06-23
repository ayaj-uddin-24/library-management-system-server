import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  static async getDashboardStats(req: Request, res: Response) {
    const stats = await DashboardService.getStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  }
}
