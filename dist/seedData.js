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
const Comments_1 = __importDefault(require("./model/Comments"));
const Martials_1 = __importDefault(require("./model/Martials"));
const Reviews_1 = __importDefault(require("./model/Reviews"));
const Reviews_Replies_1 = __importDefault(require("./model/Reviews_Replies"));
const Users_Martials_1 = __importDefault(require("./model/Users_Martials"));
const Users_1 = __importDefault(require("./model/Users"));
const Channels_1 = __importDefault(require("./model/Channels"));
const database_1 = require("./database");
const martialData_json_1 = require("./martialData.json");
const userSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Users_1.default.bulkCreate([
                {
                    name: "류제천",
                    email: "ryujaecheon@codestates.com",
                    password: "1234",
                    salt: "1234",
                    img: "",
                    address: "codestates",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "김영윤",
                    email: "kimyoungyoun@codestates.com",
                    password: "1234",
                    salt: "1234",
                    img: "image",
                    address: "codestates",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "김대성",
                    email: "kimdaeseong@codestates.com",
                    password: "1234",
                    salt: "1234",
                    img: "image",
                    address: "codestates",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const martialSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Martials_1.default.bulkCreate(martialData_json_1.martialData);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const reviewSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Reviews_1.default.bulkCreate([
                {
                    Martials_id: 10,
                    Users_id: 3,
                    period: 3,
                    comment: "리뷰 남깁니다.",
                    score: "4",
                    practicality: "4",
                    muscle: "4",
                    difficulty: "5",
                    intensity: "3",
                    injury: "3",
                },
                // {
                //   Martials_id: 7,
                //   Users_id: 3,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "4",
                //   muscle: "4",
                //   difficulty: "5",
                //   intensity: "3",
                //   injury: "3",
                // },
                // {
                //   Martials_id: 7,
                //   Users_id: 3,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "4",
                //   muscle: "4",
                //   difficulty: "5",
                //   intensity: "3",
                //   injury: "3",
                // },
                // {
                //   Martials_id: 7,
                //   Users_id: 3,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "4",
                //   muscle: "4",
                //   difficulty: "5",
                //   intensity: "3",
                //   injury: "3",
                // },
                // {
                //   Martials_id: 2,
                //   Users_id: 1,
                //   period: 4,
                //   comment: "리뷰 남깁니다.",
                //   score: "4",
                //   practicality: "3",
                //   muscle: "3",
                //   difficulty: "4",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 1,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "4",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 1,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "4",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 3,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "2",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 3,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 3,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "3",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 7,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "1",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 7,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "3",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 7,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "5",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "3",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "4",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "4",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "3",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
                // {
                //   Martials_id: 19,
                //   Users_id: 2,
                //   period: 3,
                //   comment: "리뷰 남깁니다.",
                //   score: "2",
                //   practicality: "3",
                //   muscle: "2",
                //   difficulty: "3",
                //   intensity: "5",
                //   injury: "4",
                // },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const userMartialsSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Users_Martials_1.default.bulkCreate([
                {
                    Martials_id: 1,
                    Users_id: 3,
                },
                {
                    Martials_id: 2,
                    Users_id: 1,
                },
                {
                    Martials_id: 1,
                    Users_id: 2,
                },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const commentSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Comments_1.default.bulkCreate([
                {
                    Martials_id: 1,
                    Users_id: 3,
                    comment: "한줄평 남깁니다.",
                },
                {
                    Martials_id: 2,
                    Users_id: 1,
                    comment: "한줄평 남깁니다.",
                },
                {
                    Martials_id: 1,
                    Users_id: 2,
                    comment: "한줄평 남깁니다.",
                },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const reviewRepliesSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Reviews_Replies_1.default.bulkCreate([
                {
                    Reviews_id: 1,
                    Users_id: 3,
                    comment: "리뷰에 댓글 답니다.",
                },
                {
                    Reviews_id: 2,
                    Users_id: 1,
                    comment: "리뷰에 댓글 답니다.",
                },
                {
                    Reviews_id: 3,
                    Users_id: 2,
                    comment: "리뷰에 댓글 답니다.",
                },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const channelSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Channels_1.default.bulkCreate([
                {
                    name: "비디토리",
                    caption: "비디토리 채널",
                    url: "https://www.youtube.com/results?search_query=%EB%B9%84%EB%94%94%ED%86%A0%EB%A6%AC",
                    img: "Not yet",
                },
                {
                    name: "호구커플",
                    caption: "호구커플 채널",
                    url: "https://www.youtube.com/results?search_query=%ED%98%B8%EA%B5%AC%EC%BB%A4%ED%94%8C",
                    img: "Not yet",
                },
                {
                    name: "양감독 TV",
                    caption: "양감독 TV 채널",
                    url: "https://www.youtube.com/channel/UCKxLXXUTY6bt9Dxuu-pJ4Yw",
                    img: "Not yet",
                },
            ]);
        }
        catch (e) {
            console.log(e.message);
        }
    }));
});
const setData = () => __awaiter(void 0, void 0, void 0, function* () {
    // await userSeed();
    // await martialSeed();
    yield reviewSeed();
    // await userMartialsSeed();
    // await commentSeed();
    // await reviewRepliesSeed();
    // await channelSeed();
});
setData();
