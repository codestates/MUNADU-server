"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.rank = exports.bookmarkCreate = exports.bookmark = exports.info = void 0;
const Martials_1 = __importDefault(require("../model/Martials"));
const Reviews_1 = __importDefault(require("../model/Reviews"));
const Users_1 = __importDefault(require("../model/Users"));
const Users_Martials_1 = __importDefault(require("../model/Users_Martials"));
const auth_1 = require("./auth");
const sequelize_1 = __importStar(require("sequelize"));
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MartialData = yield Martials_1.default.findAll();
        res.status(200).json({ data: MartialData, message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.info = info;
const bookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.isAuthorized(req)) {
        res.status(403).send({ message: "Invalid Access Token" });
    }
    try {
        const userMatialData = yield Users_1.default.findOne({
            where: { id: req.params.userid },
            include: {
                model: Martials_1.default,
                through: { attributes: [] },
            },
        });
        const result = userMatialData === null || userMatialData === void 0 ? void 0 : userMatialData.martials.map((el) => el.get({ plain: true }));
        res.status(200).json({ data: result, message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.bookmark = bookmark;
const bookmarkCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.isAuthorized(req)) {
        res.status(403).json({ message: "Invalid Access Token" });
    }
    try {
        const { Users_id, Martials_id } = req.body;
        const createData = yield Users_Martials_1.default.create({
            Users_id,
            Martials_id,
        });
        res.status(201).json({ message: "Created" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.bookmarkCreate = bookmarkCreate;
const rank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const averageData = yield Reviews_1.default.findAll({
            attributes: [
                "Martials_id",
                [sequelize_1.default.fn("AVG", sequelize_1.default.col("score")), "scoreAvg"],
            ],
            group: ["Martials_id"],
            order: [[sequelize_1.default.fn("AVG", sequelize_1.default.col("score")), "DESC"]],
        });
        const ranked = averageData.slice(0, 3).map((el) => el.Martials_id);
        const resultData = yield Martials_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ id: ranked[0] }, { id: ranked[1] }, { id: ranked[2] }],
            },
        });
        res.status(200).json({ data: resultData, message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.rank = rank;
