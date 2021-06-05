import { Router } from "express";
import * as martial from "../controller/martial";

const martialRouter = Router();

martialRouter.get("/info", martial.info);
martialRouter.get("/bookmark/:userid", martial.bookmark);
martialRouter.post("/bookmark-create", martial.bookmarkCreate);
martialRouter.get("/rank", martial.rank);
martialRouter.post("/coordinate", martial.coordinate);

export default martialRouter;
