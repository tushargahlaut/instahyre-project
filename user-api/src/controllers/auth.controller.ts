import { Request, Response } from "express";
import { LoginService, RegisterService } from "../services/auth.service";
import { RegisteredUserCreation } from "../interfaces/registereduser.interface";
import { generateJWTToken } from "../utils/jwt.utils";

export const LoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
      return res.status(400).json({
        message: "Missing Credentials",
      });
    }
    const LoginUser = await LoginService({ phone_number, password });
    if (LoginUser === null) {
      return res.status(400).json({
        message: "Wrong Credentials, Try Later",
      });
    }
    const token = generateJWTToken(LoginUser);
    return res.status(200).json({
      message: "Logged In Successfully",
      token,
      data: LoginUser,
    });
  } catch (error: any) {
    if (error.message === "User Not Found, Please Register") {
      return res.status(400).json({
        message: "User Not Registered",
      });
    } else {
      console.log("Error while Logging In", error);
      return res.status(500).json({
        message: "Couldn't Login, Please Try Again Later",
      });
    }
  }
};

export const RegisterController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, phone_number }: RegisteredUserCreation =
      req.body;
    if (!name || !password || !phone_number) {
      return res.status(400).json({
        message: "Missing Credentials",
      });
    }
    const RegisteredUser = await RegisterService({
      name,
      email,
      password,
      phone_number,
    });

    const token = generateJWTToken(RegisteredUser);
    return res.status(200).json({
      message: "User Registered Successfully",
      token,
      data: RegisteredUser,
    });
  } catch (error: any) {
    if (error.message === "Phone number is already in use") {
      return res.status(400).json({
        message: "Phone number is already registered",
      });
    } else {
      console.log("Error while Registering User", error);
      return res.status(500).json({
        message: "Couldn't Register, Please Try Again Later",
      });
    }
  }
};
