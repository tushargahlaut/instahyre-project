import { CreateContactDAL, GetContactsDAL } from "../database/dal/contact.dal";
import { ContactInt, ContactCreation } from "../interfaces/contact.interface";

export const GetContactsService = async (
  user_id: string
): Promise<ContactInt[]> => {
  try {
    const contacts = await GetContactsDAL(user_id);
    return contacts;
  } catch (error: any) {
    console.log("Couldn't Get Contacts", error);
    throw new Error("Couldn't Get Contacts");
  }
};

export const CreateContactService = async (
  payload: ContactCreation
): Promise<ContactInt> => {
  try {
    const createdContact = await CreateContactDAL(payload);
    return createdContact;
  } catch (error) {
    console.log("Couldn't Create Token", error);
    throw new Error("");
  }
};
