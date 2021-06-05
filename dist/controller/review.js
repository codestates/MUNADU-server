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
exports.update = exports.deleteReview = exports.create = exports.userList = exports.martialList = void 0;
const Reviews_1 = __importDefault(require("../model/Reviews"));
// ? 해당 무술에 달린 모든 리뷰 리스트를 불러옵니다.
const martialList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Reviews_1.default.findAll({
            where: { Martials_id: req.params.martialid },
        });
        console.log(`data`, data);
        res.status(200).json({ data: data, message: "ok" });
    }
    catch (err) {
        console.log(`err`, err);
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.martialList = martialList;
// ? 로그인한 사용자가 남긴 리뷰리스트를 불러옵니다.
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const data = yield Reviews_1.default.findAll({
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
// ? 새로운 리뷰를 생성합니다.
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { period, comment, score, practicality, muscle, difficulty, intensity, injury, Martials_id, Users_id, } = req.body;
        let data = yield Reviews_1.default.create({
            period: period,
            comment: comment,
            score: score,
            practicality: practicality,
            muscle: muscle,
            difficulty: difficulty,
            intensity: intensity,
            injury: injury,
            Martials_id: Martials_id,
            Users_id: Users_id,
        });
        res.status(201).json({
            data: { Reviews_id: data.id },
            message: "ok",
        });
    }
    catch (e) {
        res.status(404).json({
            message: "Not Found",
        });
    }
});
exports.create = create;
// ? 본인이 남긴 리뷰를 삭제합니다.
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { reviewId } = req.body;
        const data = yield Reviews_1.default.destroy({
            where: { id: reviewId },
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
exports.deleteReview = deleteReview;
// ? 본인이 남김 리뷰의 8가지 항목을 수정합니다.
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!isAuthorized(req)) {
    //   res.status(403).json({message: "Invalid Access Token"});
    //   return;
    // }
    try {
        const { score, practicality, muscle, difficulty, intensity, injury, period, comment, reviewId, } = req.body;
        const data = yield Reviews_1.default.update({
            score: score,
            practicality: practicality,
            muscle: muscle,
            difficulty: difficulty,
            intensity: intensity,
            injury: injury,
            period: period,
            comment: comment,
        }, { where: { id: reviewId } });
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
