import { Router } from "express";
import * as comment from "../controller/comment";

const commentRouter = Router();

commentRouter.get("/martial-list/:martialid", comment.martialList);
commentRouter.get("/user-list/:userid", comment.userList);
commentRouter.post("/create", comment.create);
commentRouter.delete("/delete", comment.deleteComment);
commentRouter.put("/update", comment.update);
commentRouter.get("/rank", comment.rank);

export default commentRouter;
