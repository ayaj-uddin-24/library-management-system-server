import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { TokenPayload } from "../types";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, authConfig.bcryptSaltRounds);
};

export const comparePassword = async (
  password: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = authConfig.jwtSecret;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, secret as jwt.Secret, {
    expiresIn: authConfig.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, authConfig.refreshTokenSecret as jwt.Secret, {
    expiresIn: authConfig.refreshTokenExpiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, authConfig.jwtSecret) as TokenPayload;
};
