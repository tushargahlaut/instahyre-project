import { Router } from "express";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import {
  GetSpamListController,
  MarkSpamController,
} from "../controllers/spam.controller";

const SpamRouter = Router();

SpamRouter.post("/spam", VerifyTokenMiddleware, MarkSpamController);
SpamRouter.get("/spam", VerifyTokenMiddleware, GetSpamListController);

export default SpamRouter;
