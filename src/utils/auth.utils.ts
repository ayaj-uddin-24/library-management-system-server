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
  return jwt.sign(payload, authConfig.jwtSecret as jwt.Secret, {
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
