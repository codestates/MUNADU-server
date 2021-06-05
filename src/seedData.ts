import Comments from "./model/Comments";
import Martials from "./model/Martials";
import Reviews from "./model/Reviews";
import Reviews_Replies from "./model/Reviews_Replies";
import Users_Martials from "./model/Users_Martials";
import Users from "./model/Users";
import Channels from "./model/Channels";
import { sequelize } from "./database";
import { martialData } from "./martialData.json";

const userSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Users.bulkCreate([
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
    } catch (e) {
      console.log(e.message);
    }
  });
};
const martialSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Martials.bulkCreate(martialData);
    } catch (e) {
      console.log(e.message);
    }
  });
};
const reviewSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Reviews.bulkCreate([
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
        {
          Martials_id: 7,
          Users_id: 3,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "4",
          muscle: "4",
          difficulty: "5",
          intensity: "3",
          injury: "3",
        },
        {
          Martials_id: 7,
          Users_id: 3,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "4",
          muscle: "4",
          difficulty: "5",
          intensity: "3",
          injury: "3",
        },
        {
          Martials_id: 7,
          Users_id: 3,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "4",
          muscle: "4",
          difficulty: "5",
          intensity: "3",
          injury: "3",
        },
        {
          Martials_id: 2,
          Users_id: 1,
          period: 4,
          comment: "리뷰 남깁니다.",
          score: "4",
          practicality: "3",
          muscle: "3",
          difficulty: "4",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 1,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "4",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 1,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "4",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 3,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "2",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 3,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 3,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "3",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 7,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "1",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 7,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "3",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 7,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "5",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "3",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "4",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "4",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "3",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
        {
          Martials_id: 19,
          Users_id: 2,
          period: 3,
          comment: "리뷰 남깁니다.",
          score: "2",
          practicality: "3",
          muscle: "2",
          difficulty: "3",
          intensity: "5",
          injury: "4",
        },
      ]);
    } catch (e) {
      console.log(e.message);
    }
  });
};
const userMartialsSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Users_Martials.bulkCreate([
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
    } catch (e) {
      console.log(e.message);
    }
  });
};
const commentSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Comments.bulkCreate([
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
    } catch (e) {
      console.log(e.message);
    }
  });
};
const reviewRepliesSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Reviews_Replies.bulkCreate([
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
    } catch (e) {
      console.log(e.message);
    }
  });
};
const channelSeed = async () => {
  sequelize.authenticate().then(async () => {
    try {
      await Channels.bulkCreate([
        {
          name: "비디토리",
          caption: "비디토리 채널",
          url: "https://www.youtube.com/results?search_query=%EB%B9%84%EB%94%94%ED%86%A0%EB%A6%AC",
          img: "Viditory",
        },
        {
          name: "호구커플",
          caption: "호구커플 채널",
          url: "https://www.youtube.com/results?search_query=%ED%98%B8%EA%B5%AC%EC%BB%A4%ED%94%8C",
          img: "hoguCouple",
        },
        {
          name: "양감독 TV",
          caption: "양감독 TV 채널",
          url: "https://www.youtube.com/channel/UCKxLXXUTY6bt9Dxuu-pJ4Yw",
          img: "YangTV",
        },
      ]);
    } catch (e) {
      console.log(e.message);
    }
  });
};

const setData = async () => {
  await userSeed();
  await martialSeed();
  await reviewSeed();
  await userMartialsSeed();
  await commentSeed();
  await reviewRepliesSeed();
  await channelSeed();
};

setData();
