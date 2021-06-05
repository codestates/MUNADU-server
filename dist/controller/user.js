"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit = exports.signup = exports.signout = exports.signin = exports.userinfo = void 0;
const Users_1 = __importDefault(require("../model/Users"));
const auth_1 = require("./auth");
const userinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield Users_1.default.findOne({
            where: {
                id: req.url.split("/info/")[1],
            },
        });
        console.log(`req.url`, req.url);
        if (userData) {
            const { id, name, email, img, address } = userData;
            res.status(200).send({
                date: {
                    id,
                    name,
                    email,
                    img,
                    address,
                },
                message: "ok",
            });
        }
        else {
            res.status(403).send("Invalid user id");
        }
    }
    catch (e) {
        res.status(403).send("Invalid user id");
    }
});
exports.userinfo = userinfo;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).send("Invalid user email or password");
        }
        const userData = yield Users_1.default.findOne({
            where: {
                email,
            },
        });
        if (userData) {
            const hashedPsw = auth_1.createhashedPassword(password, userData.salt);
            if (hashedPsw !== userData.password) {
                res.status(403).send("Invalid user password");
            }
            const accessToken = auth_1.generateAccessToken({
                id: userData.id,
                email: userData.email,
            });
            const refreshToken = auth_1.generateRefreshToken({
                id: userData.id,
                email: userData.email,
            });
            auth_1.sendRefreshToken(res, refreshToken);
            auth_1.sendAccessToken(res, 200, accessToken);
        }
        else {
            res.status(403).send("Invalid user email");
        }
    }
    catch (e) {
        res.status(403).send("Invalid user email or password");
    }
});
exports.signin = signin;
const signout = (req, res) => {
    try {
        if (!auth_1.isAuthorized(req)) {
            res.status(403).send("Invalid access Token");
        }
        else {
            res.status(200).send("Success logout");
        }
    }
    catch (e) {
        res.status(403).send("Fail logout");
    }
};
exports.signout = signout;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email } = req.body;
        if (!email || !password || !name) {
            res.status(422).send("insufficient parameters supplied");
        }
        const isUser = yield Users_1.default.findOne({
            where: { email },
        });
        if (isUser) {
            res.status(409).send("email exists");
        }
        const salt = auth_1.createSalt();
        const newUser = yield Users_1.default.create({
            salt,
            email,
            name,
            password: auth_1.createhashedPassword(password, salt),
            img: 0,
            address: "null",
        });
        res.status(201).send({ data: { id: newUser.id }, massege: "ok" });
    }
    catch (err) {
        res.status(422).send("insufficient parameters supplied");
    }
});
exports.signup = signup;
const edit = (req, res) => {
    try {
        res.status(200).send("working...");
    }
    catch (e) {
        console.log("error...");
    }
};
exports.edit = edit;
