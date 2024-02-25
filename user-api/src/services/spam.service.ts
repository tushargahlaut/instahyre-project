import {
  GetSpamCountDAL,
  GetSpamListDAL,
  MarkSpamDAL,
} from "../database/dal/spam.dal";
import { SpamCreation, SpamInt } from "../interfaces/spam.interface";

export const MarkSpamService = async ({
  phone_number,
}: SpamCreation): Promise<SpamInt> => {
  try {
    const markSpam = MarkSpamDAL({ phone_number });
    return markSpam;
  } catch (error) {
    console.log("Couldn't Mark Number as Spam", error);
    throw new Error("Couldn't Mark Number as Spam");
  }
};

export const GetSpamListService = async (): Promise<SpamInt[]> => {
  try {
    const spammerList = await GetSpamListDAL();
    return spammerList;
  } catch (error) {
    console.log("Couldn't get list of spammers", error);
    throw new Error("Couldn't get list of spammers");
  }
};

export const GetSpamCountOfNumberService = async (
  phone_number: number
): Promise<number> => {
  try {
    const spamCount = await GetSpamCountDAL(phone_number);
    return spamCount;
  } catch (error) {
    console.log("Couldn't find Spam Count for the number", error);
    throw new Error("Couldn't find Spam Count for the number");
  }
};
