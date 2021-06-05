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
exports.update = exports.deleteComment = exports.create = exports.userList = exports.martialList = void 0;
const Comments_1 = __importDefault(require("../model/Comments"));
const auth_1 = require("./auth");
const martialList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentsData = yield Comments_1.default.findAll({
            where: { Martials_id: req.params.martialid },
        });
        res.status(200).json({ data: commentsData, message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.martialList = martialList;
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentsUserData = yield Comments_1.default.findAll({
            where: { Users_id: req.params.userid },
        });
        res.status(200).json({ data: commentsUserData, message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.userList = userList;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.isAuthorized(req)) {
        res.status(403).json({ message: "Invalid Access Token" });
        return;
    }
    try {
        const { comment, userid, martialid } = req.body;
        const createData = yield Comments_1.default.create({
            comment,
            Users_id: userid,
            Martials_id: martialid,
        });
        res
            .status(201)
            .json({ data: { Comments_id: createData.id }, message: "created" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.create = create;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.isAuthorized(req)) {
        res.status(403).json({ message: "Invalid Access Token" });
        return;
    }
    try {
        const { commentid } = req.body;
        const findData = yield Comments_1.default.findOne({ where: { id: commentid } });
        if (!findData) {
            res.status(404).json({ message: "Not Found" });
        }
        const data = yield Comments_1.default.destroy({
            where: { id: commentid },
        });
        res.status(200).json({ message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.deleteComment = deleteComment;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth_1.isAuthorized(req)) {
        res.status(403).json({ message: "Invalid Access Token" });
        return;
    }
    try {
        const { comment, commentid } = req.body;
        const findData = yield Comments_1.default.findOne({ where: { id: commentid } });
        if (!findData) {
            res.status(404).json({ message: "Not Found" });
        }
        const data = yield Comments_1.default.update({ comment }, { where: { id: commentid } });
        res.status(201).json({ message: "ok" });
    }
    catch (e) {
        res.status(404).json({ message: "Not Found" });
    }
});
exports.update = update;
