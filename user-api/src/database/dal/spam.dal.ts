import { SpamCreation, SpamInt } from "../../interfaces/spam.interface";
import Spam from "../model/spam.model";

export const MarkSpamDAL = async ({
  phone_number,
}: SpamCreation): Promise<SpamInt> => {
  try {
    const doesPhoneNumberExists = await Spam.findOne({
      where: {
        phone_number,
      },
    });
    if (doesPhoneNumberExists) {
      const incrementSpamCount = await doesPhoneNumberExists.increment(
        "spam_count",
        {
          by: 1,
        }
      );
      return incrementSpamCount;
    } else {
      const createNewSpamRecord = await Spam.create({ phone_number });
      return createNewSpamRecord;
    }
  } catch (error) {
    console.log("Couldn't Mark Number as Spam", error);
    throw new Error("Couldn't Mark Number as Spam");
  }
};

export const GetSpamListDAL = async (): Promise<SpamInt[]> => {
  try {
    const spammerList = await Spam.findAll({
      order: [["spam_count", "DESC"]],
    });
    return spammerList;
  } catch (error) {
    console.log("Couldn't get Spam List", error);
    throw new Error("Couldn't get Spam List");
  }
};

export const GetSpamCountDAL = async (
  phone_number: number
): Promise<number> => {
  try {
    const [spamInstance, created] = await Spam.findOrCreate({
      where: {
        phone_number,
      },
      attributes: ["spam_count"],
    });

    return spamInstance.get("spam_count") as number;
  } catch (error) {
    console.log("Couldn't find Spam Count for the number", error);
    throw new Error("Couldn't find Spam Count for the number");
  }
};
