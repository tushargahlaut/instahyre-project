import { Request, Response } from "express";
import {
  CreateContactService,
  GetContactsService,
} from "../services/contact.service";

export const GetContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req;
    const contacts = await GetContactsService(user.payload.user_id);
    return res.status(200).json({
      data: contacts,
    });
  } catch (error: any) {
    console.log("Couldn't Get Contacts", error);
    return res.status(500).json({
      message: "Couldn't Get Contacts",
    });
  }
};

export const CreateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, phone_number } = req.body;
    const { user } = req;
    const user_id = user.payload.user_id;
    if (!name || !phone_number) {
      return res.status(400).json({
        message: "Name or Phone Number is Missing",
      });
    }
    const createdContact = await CreateContactService({
      user_id,
      name,
      phone_number,
    });
    return res.status(201).json({
      message: "Contact Created Successfully",
    });
  } catch (error) {
    console.log("Couldn't Create Contact");
    return res.status(500).json({
      message: "Couldn't Create Contact",
    });
  }
};
