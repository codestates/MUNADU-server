import { Router } from "express";
import userRouter from "./user";
import martialRouter from "./martial";
import reviewRouter from "./review";
import commentRouter from "./comment";
import replyRouter from "./reply";
import channelRouter from "./channel";

const router = Router();

router.use("/user", userRouter);
router.use("/martial", martialRouter);
router.use("/review", reviewRouter);
router.use("/comment", commentRouter);
router.use("/reply", replyRouter);
router.use("/channel", channelRouter);

export default router;
