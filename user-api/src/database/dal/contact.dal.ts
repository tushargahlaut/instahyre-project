import { Op } from "sequelize";
import {
  ContactCreation,
  ContactInt,
} from "../../interfaces/contact.interface";
import Contact from "../model/contact.model";

export const GetContactsDAL = async (
  user_id: string
): Promise<ContactInt[]> => {
  try {
    const contacts = await Contact.findAll({
      where: {
        user_id,
      },
    });
    return contacts;
  } catch (error) {
    console.log("Couldn't Get Contacts", error);
    throw new Error("Couldn't Get Contacts");
  }
};

export const CreateContactDAL = async (
  payload: ContactCreation
): Promise<ContactInt> => {
  try {
    const createdContact = await Contact.create(payload);
    return createdContact;
  } catch (error) {
    console.log("Couldn't Create Contact");
    throw new Error("Couldn't Create Contact");
  }
};

export const FindContactByNameDAL = async (name: string, user_id: string) => {
  try {
    const contacts = await Contact.findAll({
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
              [Op.eq]: user_id,
            },
          },
        ],
      },
      attributes: ["name", "phone_number"],
    });
    return contacts;
  } catch (error) {
    console.log("Couldn't Get Contacts", error);
    throw new Error("Couldn't Get Contacts");
  }
};

export const FindContactsByPhoneDAL = async (phone_number: number) => {
  try {
    const findContactsByPhone = await Contact.findAll({
      where: {
        phone_number,
      },
      attributes: ["name", "phone_number"],
    });
    return findContactsByPhone;
  } catch (error) {
    console.log("Couldn't Get Contacts", error);
    throw new Error("Couldn't Get Contacts");
  }
};

export const FindContactByUserIdAndPhoneDAL = async (
  user_id: string,
  currUserPhone: number
) => {
  try {
    const findContact = await Contact.findOne({
      where: {
        user_id,
        phone_number: currUserPhone,
      },
    });
    if (findContact) {
      return findContact;
    }
    return null;
  } catch (error) {
    console.log("Couldn't Find Contact");
    throw new Error("Couldn't Find Contact");
  }
};
