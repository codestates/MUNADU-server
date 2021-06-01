import { Request, Response } from "express";
import Comments from "../model/Comments";
import Martials from "../model/Martials";
import Users from "../model/Users";
import sequelize from "sequelize";
import { isAuthorized } from "./auth";

export const martialList = async (req: Request, res: Response) => {
  try {
    const commentsData = await Comments.findAll({
      where: { Martials_id: req.params.martialid },
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ data: commentsData, message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const userList = async (req: Request, res: Response) => {
  try {
    const commentsUserData = await Comments.findAll({
      where: { Users_id: req.params.userid },
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ data: commentsUserData, message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const create = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { comment, userid, martialid } = req.body;
    const createData = await Comments.create({
      comment,
      Users_id: userid,
      Martials_id: martialid,
    });
    const commentData = await Comments.findOne({
      where: { id: createData.id },
      include: {
        model: Users,
        attributes: ["name", "img"],
        where: { id: sequelize.col("Users_id") },
      },
    });
    res.status(201).json({ data: commentData, message: "created" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { commentid } = req.body;
    const findData = await Comments.findOne({ where: { id: commentid } });
    if (!findData) {
      res.status(404).json({ message: "Not Found" });
    }
    const data = await Comments.destroy({
      where: { id: commentid },
    });
    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};
export const update = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    res.status(403).json({ message: "Invalid Access Token" });
    return;
  }
  try {
    const { comment, commentid } = req.body;
    const findData = await Comments.findOne({ where: { id: commentid } });
    if (!findData) {
      res.status(404).json({ message: "Not Found" });
    }
    const data = await Comments.update(
      { comment },
      { where: { id: commentid } }
    );
    res.status(201).json({ message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
};

export const rank = async (req: Request, res: Response) => {
  try {
    const data = await Comments.findAll({
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
