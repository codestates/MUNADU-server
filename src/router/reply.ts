import { Router } from "express";
import * as reply from "../controller/reply";

const replyRouter = Router();

replyRouter.get("/review-list/:reviewid", reply.reviewList);
replyRouter.get("/all-reply-list", reply.allReplyList);
replyRouter.get("/user-list/:userid", reply.userList);
replyRouter.post("/create", reply.create);
replyRouter.delete("/delete", reply.deleteReply);
replyRouter.put("/update", reply.update);

export default replyRouter;
