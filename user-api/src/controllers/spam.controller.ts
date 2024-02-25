import { Request, Response } from "express";
import { GetSpamListService, MarkSpamService } from "../services/spam.service";
import { SpamCreation } from "../interfaces/spam.interface";

export const MarkSpamController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phone_number }: SpamCreation = req.body;
    if (!phone_number) {
      return res.status(400).json({
        message: "phone number was not provided",
      });
    }
    const markSpam = await MarkSpamService({ phone_number });
    console.log("Spam Mark Controller", markSpam);
    return res.status(201).json({
      message: "Number was marked as spam",
    });
  } catch (error) {
    console.log("Error while marking number as spam", error);
    return res.status(500).json({
      message: "Couldn't Mark Number as Spam",
    });
  }
};

export const GetSpamListController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const spammerList = await GetSpamListService();
    return res.status(200).json({
      message: "Top Spammers",
      data: spammerList,
    });
  } catch (error) {
    console.log("Couldn't get list of spammers", error);
    throw new Error("Couldn't get list of spammers");
  }
};
