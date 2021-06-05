import { Router } from "express";
import * as review from "../controller/review";

const reviewRouter = Router();

reviewRouter.get("/martial-list/:martialid", review.martialList);
reviewRouter.get("/user-list/:userid", review.userList);
reviewRouter.post("/create", review.create);
reviewRouter.delete("/delete", review.deleteReview);
// "use strict" 모드에서는 delete가 변수 이름으로 사용되면 안된다고 합니다.
reviewRouter.put("/update", review.update);

reviewRouter.get("/average/:martialid", review.average);

reviewRouter.get("/rank", review.rank);


export default reviewRouter;
