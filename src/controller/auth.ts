import { Request, Response } from "express";
import { verify, sign } from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

export const generateAccessToken = (data: any) => {
  return sign(data, process.env.ACCESS_SECRET!, { expiresIn: "1d" });
};
export const generateRefreshToken = (data: any) => {
  return sign(data, process.env.REFRESH_SECRET!, { expiresIn: "30d" });
};
export const sendAccessToken = (
  res: Response,
  statusCode: number,
  accessToken: any,
  id: number | undefined
) => {
  res.status(statusCode).json({ data: { accessToken, id }, message: "ok" });
};
export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
};
export const isAuthorized = (req: Request) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return null;
  }
  const token = authorization.split(" ")[1];
  try {
    return verify(token, process.env.ACCESS_SECRET!);
  } catch (e) {
    return null;
  }
};

export const checkRefreshToken = (refreshToken: string) => {
  try {
    return verify(refreshToken, process.env.REFRESH_SECRET!);
  } catch (e) {
    return null;
  }
};

export const createSalt = () => {
  return crypto.randomBytes(64).toString("base64");
};

export const createhashedPassword = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 103523, 64, "sha512")
    .toString("base64");
};
