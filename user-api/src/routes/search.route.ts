import { Router } from "express";
import {
  GetEmailAddressAndDetailsController,
  SearchByNameController,
  SearchByPhoneController,
} from "../controllers/search.controller";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
const SearchRouter = Router();

SearchRouter.get("/listbyname", VerifyTokenMiddleware, SearchByNameController);
SearchRouter.get(
  "/listbyphone",
  VerifyTokenMiddleware,
  SearchByPhoneController
);
SearchRouter.get(
  "/details",
  VerifyTokenMiddleware,
  GetEmailAddressAndDetailsController
);

export default SearchRouter;
