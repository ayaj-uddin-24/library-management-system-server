import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterInput } from "../types";
import { User } from "../models/User.model";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const userData: RegisterInput = req.body;
      const user = await AuthService.register(userData);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);

      // Set refresh token in httpOnly cookie
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (userId) {
        await User.findByIdAndUpdate(userId, { refreshToken: null });
      }

      res.clearCookie("refreshToken");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      throw error;
    }
  }
}
