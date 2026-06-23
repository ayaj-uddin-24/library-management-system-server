import { User } from "../models/User.model";
import { RegisterInput } from "../types";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.utils";
import { AppError } from "../middlewares/error.middleware";

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError("User already exists with this email", 409);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const { password, refreshToken, ...userWithoutSensitive } = user.toObject();
    return userWithoutSensitive;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    const { password: _, refreshToken: __, ...userData } = user.toObject();

    return { user: userData, accessToken, refreshToken };
  }

  static async refreshToken(oldRefreshToken: string) {
    // Will implement full logic in next step if needed
    throw new AppError("Refresh token logic coming soon", 501);
  }
}
