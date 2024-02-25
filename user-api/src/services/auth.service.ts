import { UniqueConstraintError } from "sequelize";
import { FindUserDAL, RegisterUserDAL } from "../database/dal/user.dal";
import {
  RegisteredUserCreation,
  RegisteredUserInt,
} from "../interfaces/registereduser.interface";
import { HashPassword, VerifyPassword } from "../utils/bcrypt.utils";
import { LoginInterface } from "../interfaces/login.interface";

export const RegisterService = async (
  payload: RegisteredUserCreation
): Promise<RegisteredUserInt> => {
  try {
    const newPassword = await HashPassword(payload.password);
    payload.password = newPassword;
    const RegisterUser = await RegisterUserDAL(payload);
    return RegisterUser;
  } catch (error: any) {
    if (error.message === "Phone number is already in use") {
      throw new Error("Phone number is already in use");
    } else {
      console.log("Error while Registering User in DAL", error);
      throw new Error("Couldn't Create User");
    }
  }
};

export const LoginService = async ({
  phone_number,
  password,
}: LoginInterface): Promise<RegisteredUserInt | null> => {
  try {
    const findUser = await FindUserDAL(phone_number);
    if (findUser === null) {
      throw new Error("User Not Found, Please Register");
    }
    const isPasswordCorrect = await VerifyPassword(password, findUser.password);
    if (isPasswordCorrect) {
      return findUser;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log("Couldnt Login, Try Again Later", error);
    throw new Error("Couldnt Login, Try Again Later");
  }
};
