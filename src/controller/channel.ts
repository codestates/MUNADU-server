import { Request, Response } from "express";
import Channels from "../model/Channels";

export const channel = async (req: Request, res: Response) => {
  try {
    const channelData = await Channels.findAll();
    res.status(200).json({ data: channelData, message: "ok" });
  } catch (e) {
    res.status(404).json({ message: "ok" });
  }
};
