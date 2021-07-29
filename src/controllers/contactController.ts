import { v4 as uuidV4 } from "uuid";
import { Contact } from "./../modules/entities/Contact";
import { getConnection, getRepository } from "typeorm";
import { AppError } from "./../errors/AppError";
import { Request, Response } from "express";
import { createContactValidator } from "./../validations/createContactValidator";
import { updateContactValidator } from "./../validations/updateContactValidator";

async function getContacts(
  request: Request,
  response: Response
): Promise<void> {
  const { name, email } = request.query;

  try {
    const contactList = await getRepository(Contact)
      .createQueryBuilder("contact")
      .where(
        "(contact.firstName like :name or contact.lastName like :name) and contact.email like :email",
        {
          name: `%${name ? name : ""}%`,
          email: `%${email ? email : ""}%`,
        }
      )
      .getMany();

    const list = contactMapper(contactList);

    response.status(200).json(list);
  } catch (error) {
    throw new AppError("Error on returning contact.", 500);
  }
}

async function createContact(
  request: Request,
  response: Response
): Promise<void> {
  const { firstName, lastName, email, telephones } = request.body;

  createContactValidator(request.body);
  try {
    const returned = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values([
        {
          id: uuidV4(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          telephones: telephones.join("|"),
        },
      ])
      .execute();

    const contact = await getRepository(Contact)
      .createQueryBuilder("contact")
      .where("contact.id = :id", {
        id: returned.identifiers[0].id,
      })
      .getOne();

    const list = contactMapper([contact]);

    response.status(201).json({
      contact: list[0],
      message: "The contact was created.",
    });
  } catch (error) {
    throw new AppError("Error on creating contact.", 500);
  }
}

async function removeContact(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;

  try {
    const returned = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Contact)
      .where("id = :id", { id: id })
      .execute();

    if (returned.affected === 0) {
      response.status(404).json({ message: `The contact was not found.` });
    } else {
      response.json({ message: `The contact was removed.` });
    }
  } catch (error) {
    throw new AppError("Error while removing contact.", 500);
  }
}

async function updateContact(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;

  updateContactValidator(request.body);

  try {
    const returned = await getConnection()
      .createQueryBuilder()
      .update(Contact)
      .set(request.body)
      .where("id = :id", { id: id })
      .execute();

    if (returned.affected === 0) {
      response.status(404).json({ message: `The contact is not found.` });
    } else {
      response.status(200).json({ message: `The contact was updated.` });
    }
  } catch (error) {
    throw new AppError("Error on updating contact.", 500);
  }
}

function contactMapper(contactList: Contact[]) {
  return contactList.map((contact) => {
    return { ...contact, telephones: contact.telephones.split("|") };
  });
}

export { getContacts, createContact, removeContact, updateContact };
