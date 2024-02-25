import { Request, Response } from "express";
import {
  GetEmailAddressAndDetailsService,
  SearchByNameService,
  SearchByPhoneService,
} from "../services/search.service";

export const SearchByNameController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const name = req.query.name as string;
    const user = req.user;
    const user_id = user.payload.user_id;
    if (!name) {
      return res.status(400).json({
        message: "Name Can't be Empty",
      });
    }
    const nameList = await SearchByNameService(name, user_id);
    return res.status(200).json({
      data: nameList,
    });
  } catch (error) {
    console.log("Couldn't Get Name List", error);
    return res.status(500).json({});
  }
};

export const SearchByPhoneController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const phone = req.query.phone;
    if (!phone || isNaN(Number(phone))) {
      return res.status(400).json({
        message: "Phone Number is null or not valid",
      });
    }

    const phoneNumber: number = parseInt(phone as string, 10);

    const phoneList = await SearchByPhoneService(phoneNumber);
    return res.status(200).json({
      data: phoneList,
    });
  } catch (error) {
    console.log("Error While Searching with phone number", error);
    return res.status(500).json({
      message: "Couldn't' Get List with Phone Number",
    });
  }
};

export const GetEmailAddressAndDetailsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user_id = req.query.id as string;
    const user = req.user;
    if (!user_id) {
      res.status(400).json({
        message: "The selected user is not registered",
      });
    }
    const currUserPhone = user.payload.phone_number;
    const data = await GetEmailAddressAndDetailsService(user_id, currUserPhone);
    if (data === null) {
      return res.status(418).json({
        message: "User has not added you in their contacts",
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("Error While Searching with phone number", error);
    return res.status(500).json({
      message: "Couldn't' Get List with Phone Number",
    });
  }
};
