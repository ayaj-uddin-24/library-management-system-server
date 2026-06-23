import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth.utils";
import { AppError } from "./error.middleware";
import { UserRole } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
        email: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Access token is required", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired access token", 401);
  }
};

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Authentication required", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Insufficient permissions", 403);
    }

    next();
  };
};
