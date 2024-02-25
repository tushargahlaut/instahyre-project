import {
  RegisteredUserCreation,
  RegisteredUserInt,
} from "../../interfaces/registereduser.interface";
import RegisteredUser from "../model/user.model";
import { FindOptions, Op, UniqueConstraintError } from "sequelize";

export const RegisterUserDAL = async (
  payload: RegisteredUserCreation
): Promise<RegisteredUserInt> => {
  try {
    const newUser = await RegisteredUser.create(payload);
    return newUser;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new Error("Phone number is already in use");
    } else {
      console.log("Error while Registering User in DAL", error);
      throw new Error("Couldn't Create User");
    }
  }
};

export const FindUserDAL = async (
  phone_number: number
): Promise<RegisteredUserInt | null> => {
  try {
    const findUser = await RegisteredUser.findOne({
      where: {
        phone_number,
      },
    });
    if (findUser) {
      return findUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Couldn't Find User", error);
    throw new Error("User Not Found");
  }
};

export const FindUserByNameDAL = async (name: string, user_id: string) => {
  try {
    const nameList = await RegisteredUser.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `${name}%`,
                },
              },
              {
                name: {
                  [Op.like]: `%${name}%`,
                },
              },
            ],
          },
          {
            user_id: {
              [Op.not]: user_id,
            },
          },
        ],
      },
      attributes: ["name", "phone_number", "user_id"],
    } as FindOptions<RegisteredUser>);
    return nameList;
  } catch (error) {
    console.log("Couldn't Get Name List", error);
    throw new Error("Couldn't Get Name List");
  }
};

export const FindRegisterdUserByUserIdDAL = async (user_id: string) => {
  try {
    const findUser = await RegisteredUser.findOne({
      where: {
        user_id,
      },
      attributes: ["email", "phone_number"],
    });
    return findUser;
  } catch (error) {
    console.log("Error in Finding Registered User");
    throw new Error("Error in Finding Registered User");
  }
};
