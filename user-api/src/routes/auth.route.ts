import { Router } from "express";
import {
  LoginController,
  RegisterController,
} from "../controllers/auth.controller";
const AuthRouter = Router();

AuthRouter.post("/login", LoginController);
AuthRouter.post("/register", RegisterController);

export default AuthRouter;
