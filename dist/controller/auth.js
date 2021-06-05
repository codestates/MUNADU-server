"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createhashedPassword = exports.createSalt = exports.checkRefreshToken = exports.isAuthorized = exports.sendRefreshToken = exports.sendAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const crypto_1 = __importDefault(require("crypto"));
const generateAccessToken = (data) => {
    return jsonwebtoken_1.sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (data) => {
    return jsonwebtoken_1.sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
};
exports.generateRefreshToken = generateRefreshToken;
const sendAccessToken = (res, statusCode, accessToken) => {
    res.status(statusCode).json({ data: { accessToken }, message: "ok" });
};
exports.sendAccessToken = sendAccessToken;
const sendRefreshToken = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
};
exports.sendRefreshToken = sendRefreshToken;
const isAuthorized = (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        return null;
    }
    const token = authorization.split(" ")[1];
    try {
        return jsonwebtoken_1.verify(token, process.env.ACCESS_SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.isAuthorized = isAuthorized;
const checkRefreshToken = (refreshToken) => {
    try {
        return jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_SECRET);
    }
    catch (e) {
        return null;
    }
};
exports.checkRefreshToken = checkRefreshToken;
const createSalt = () => {
    return crypto_1.default.randomBytes(64).toString("base64");
};
exports.createSalt = createSalt;
const createhashedPassword = (password, salt) => {
    return crypto_1.default
        .pbkdf2Sync(password, salt, 103523, 64, "sha512")
        .toString("base64");
};
exports.createhashedPassword = createhashedPassword;
