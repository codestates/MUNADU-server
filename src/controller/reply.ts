import { Request, Response } from "express";
import Reviews_Replies from "../model/Reviews_Replies";
import Users from "../model/Users";
import sequelize from "sequelize";
import { isAuthorized } from "./auth";

// ? 리뷰에 달린 댓글리스트 읽기
export const reviewList = async (req: Request, res: Response) => {
  try {
    const data = await Reviews_Replies.findAll({
      where: { Reviews_id: req.params.reviewid },
      include: {
        model: Users,
        attributes: ["name"],
        where: { id: sequelize.col("Users_id") },
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 모든 댓글리스트 읽기
export const allReplyList = async (req: Request, res: Response) => {
  try {
    const data = await Reviews_Replies.findAll({
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 특정 사용자가 작성한 모든 댓글리스트 읽기.
export const userList = async (req: Request, res: Response) => {
  try {
    const data = await Reviews_Replies.findAll({
      where: { Users_id: req.params.userid },
      include: {
        model: Users,
        attributes: ["name"],
        where: { id: sequelize.col("Users_id") },
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ data: data, message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 리뷰에 새로운 댓글을 생성
export const create = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { comment, userId, reviewId } = req.body;
    const resp = await Reviews_Replies.create({
      comment: comment,
      Users_id: userId,
      Reviews_id: reviewId,
    });
    const user = await Users.findOne({
      attributes: ["name"],
      where: { id: resp.Users_id },
    });
    console.log(`resp`, resp);
    res.status(201).json({
      data: {
        id: resp.id,
        comment: resp.comment,
        Users_id: resp.Users_id,
        Reviews_id: resp.Reviews_id,
        updatedAt: resp.updatedAt,
        createdAt: resp.createdAt,
        users: { name: user?.name },
      },
      message: "ok",
    });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 리뷰에 있는 댓글 삭제.
export const deleteReply = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { replyId } = req.body;
    const data = await Reviews_Replies.destroy({
      where: { id: replyId },
    });
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};

// ? 리뷰에 있는 댓글 수정
export const update = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { comment, replyId } = req.body;
    const data = await Reviews_Replies.update(
      {
        comment: comment,
      },
      {
        where: { id: replyId },
      }
    );
    res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log(`err`, err);
    res.status(404).json({
      message: "Not Found",
    });
  }
};
