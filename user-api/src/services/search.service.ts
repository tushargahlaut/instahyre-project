import {
  FindContactByNameDAL,
  FindContactByUserIdAndPhoneDAL,
  FindContactsByPhoneDAL,
} from "../database/dal/contact.dal";
import { GetSpamCountDAL } from "../database/dal/spam.dal";
import {
  FindRegisterdUserByUserIdDAL,
  FindUserByNameDAL,
  FindUserDAL,
} from "../database/dal/user.dal";
import { ContactInt } from "../interfaces/contact.interface";
import { RegisteredUserInt } from "../interfaces/registereduser.interface";
import { UsersWithSpamCount } from "../interfaces/spam.interface";

export const SearchByNameService = async (
  name: string,
  user_id: string
): Promise<UsersWithSpamCount[]> => {
  try {
    const registeredUsersData = await FindUserByNameDAL(name, user_id);
    const usersWithSpamCount: UsersWithSpamCount[] = [];
    for (const user of registeredUsersData) {
      const spam_count = await GetSpamCountDAL(user.phone_number);
      const { name, phone_number, user_id } = user.dataValues;
      usersWithSpamCount.push({ name, phone_number, spam_count, user_id });
    }
    const contactWithSpamCount: UsersWithSpamCount[] = [];
    const contactData = await FindContactByNameDAL(name, user_id);
    for (const contact of contactData) {
      const spam_count = await GetSpamCountDAL(contact.phone_number);
      const { name, phone_number } = contact.dataValues;
      contactWithSpamCount.push({ name, phone_number, spam_count });
    }

    const mergedArray = [...usersWithSpamCount, ...contactWithSpamCount];
    return mergedArray;
  } catch (error) {
    console.log("Couldn't Get Name List", error);
    throw new Error("Couldn't Get Name List");
  }
};

export const SearchByPhoneService = async (
  phone_number: number
): Promise<RegisteredUserInt | ContactInt[]> => {
  try {
    const findExactMatchMobileNumberRegistered = await FindUserDAL(
      phone_number
    );
    if (findExactMatchMobileNumberRegistered === null) {
      const findExactMatchInContacts = await FindContactsByPhoneDAL(
        phone_number
      );
      return findExactMatchInContacts;
    }
    return findExactMatchMobileNumberRegistered;
  } catch (error) {
    console.log("Couldn't Get Phone List", error);
    throw new Error("Couldn't Get Phone List");
  }
};

export const GetEmailAddressAndDetailsService = async (
  user_id: string,
  currUserPhone: number
) => {
  try {
    const findRecordInContact = await FindContactByUserIdAndPhoneDAL(
      user_id,
      currUserPhone
    );
    if (findRecordInContact === null) {
      return null;
    }
    const findUserEmailPhone = await FindRegisterdUserByUserIdDAL(user_id);
    if (findUserEmailPhone === null) return null;
    const spamCount = await GetSpamCountDAL(findUserEmailPhone?.phone_number);
    const combinedData = {
      email: findUserEmailPhone.email,
      phone_number: findUserEmailPhone.phone_number,
      spam_count: spamCount,
    };

    return combinedData;
  } catch (error) {
    console.log("Couldn't Get Details", error);
    throw new Error("Couldn't Get Details");
  }
};
