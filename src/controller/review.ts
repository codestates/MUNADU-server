import { Request, Response } from "express";
import { fileURLToPath } from "url";
import { isAuthorized } from "./auth";
import Reviews from "../model/Reviews";
import Users from "../model/Users";
import sequelize from "sequelize";
import Martials from "../model/Martials";

// ? 해당 무술에 달린 모든 리뷰 리스트를 불러옵니다.
export const martialList = async (req: Request, res: Response) => {
  try {
    const data = await Reviews.findAll({
      where: { Martials_id: req.params.martialid },
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
    });
    res.status(200).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 로그인한 사용자가 남긴 리뷰리스트를 불러옵니다.
export const userList = async (req: Request, res: Response) => {
  try {
    const data = await Reviews.findAll({
      where: { Users_id: req.params.userid },
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
    });
    res.status(200).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 새로운 리뷰를 생성합니다.
export const create = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const {
      period,
      comment,
      score,
      practicality,
      muscle,
      difficulty,
      intensity,
      injury,
      Martials_id,
      Users_id,
    } = req.body;
    let data = await Reviews.create({
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
    const user = await Users.findOne({
      attributes: ["name", "img"],
      where: { id: data.Users_id },
    });
    res.status(201).json({
      data: {
        Reviews_id: data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        users: { name: user?.name, img: user?.img },
      },
      message: "ok",
    });
  } catch (e) {
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 본인이 남긴 리뷰를 삭제합니다.
export const deleteReview = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { reviewId } = req.body;
    const data = await Reviews.destroy({
      where: { id: reviewId },
    });
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 본인이 남김 리뷰의 8가지 항목을 수정합니다.
export const update = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const {
      score,
      practicality,
      muscle,
      difficulty,
      intensity,
      injury,
      period,
      comment,
      reviewId,
    } = req.body;
    const data = await Reviews.update(
      {
        score: score,
        practicality: practicality,
        muscle: muscle,
        difficulty: difficulty,
        intensity: intensity,
        injury: injury,
        period: period,
        comment: comment,
      },
      { where: { id: reviewId } }
    );
    res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 해당 무술의 평균 평점을 응답한다.
export const average = async (req: Request, res: Response) => {
  try {
    const averageData = await Reviews.findAll({
      attributes: [
        "Martials_id",
        [sequelize.fn("AVG", sequelize.col("score")), "scoreAvg"],
      ],
      // group: ["Martials_id"],
      where: { Martials_id: req.params.martialid },
    });

    res.status(200).json({ data: averageData, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

export const rank = async (req: Request, res: Response) => {
  try {
    const data = await Reviews.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
      include: [
        {
          model: Martials,
          attributes: ["name"],
          where: { id: sequelize.col("Martials_id") },
        },
        {
          model: Users,
          attributes: ["name"],
          where: { id: sequelize.col("Users_id") },
        },
      ],
    });
    res.status(201).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};
