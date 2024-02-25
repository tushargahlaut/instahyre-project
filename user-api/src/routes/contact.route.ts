import { Router } from "express";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import {
  CreateContactController,
  GetContactsController,
} from "../controllers/contact.controller";
const ContactRouter = Router();

ContactRouter.get("/contacts", VerifyTokenMiddleware, GetContactsController);
ContactRouter.post("/contact", VerifyTokenMiddleware, CreateContactController);

export default ContactRouter;
