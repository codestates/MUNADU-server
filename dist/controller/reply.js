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
exports.update = exports.deleteReply = exports.create = exports.userList = exports.reviewList = void 0;
const Reviews_Replies_1 = __importDefault(require("../model/Reviews_Replies"));
// ? 리뷰에 달린 댓글리스트 읽기
const reviewList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Reviews_Replies_1.default.findAll({
            where: { Reviews_id: req.params.reviewid },
        });
        res.status(200).json({ data: data, message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.reviewList = reviewList;
// ? 특정 사용자가 작성한 모든 댓글리스트 읽기.
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const data = yield Reviews_Replies_1.default.findAll({
            where: { Users_id: req.params.userid },
        });
        res.status(200).json({ data: data, message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.userList = userList;
// ? 리뷰에 새로운 댓글을 생성
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { comment, userId, reviewId } = req.body;
        const data = yield Reviews_Replies_1.default.create({
            comment: comment,
            Users_id: userId,
            Reviews_id: reviewId,
        });
        res.status(201).json({ data: data, message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.create = create;
// ? 리뷰에 있는 댓글 삭제.
const deleteReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { replyId } = req.body;
        const data = yield Reviews_Replies_1.default.destroy({
            where: { id: replyId },
        });
        res.status(200).json({ message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.deleteReply = deleteReply;
// ? 리뷰에 있는 댓글 수정
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { comment, replyId } = req.body;
        const data = yield Reviews_Replies_1.default.update({
            comment: comment,
        }, {
            where: { id: replyId },
        });
        res.status(201).json({ message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.update = update;
