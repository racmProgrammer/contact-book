import { getContacts,createContact, removeContact, updateContact } from 'controllers/contactController';
import {Router} from 'express';

const contact = Router();

contact.get("/contact/", getContacts);
contact.post("/contact/", createContact);
contact.delete("/contact/:id", removeContact);
contact.put("/contact", updateContact);

export {contact};