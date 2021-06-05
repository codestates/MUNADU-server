import { Router } from "express";
import * as channel from "../controller/channel";

const channelRouter = Router();

channelRouter.get("/", channel.channel);

export default channelRouter;
