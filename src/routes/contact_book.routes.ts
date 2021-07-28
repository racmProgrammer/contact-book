import { getContacts,createContact, removeContact } from 'controllers/contactController';
import {Router} from 'express';

const contact = Router();

contact.get("/contact/", getContacts);
contact.post("/contact/", createContact);
contact.delete("/contact/:id", removeContact);

export {contact};