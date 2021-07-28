import {Router} from 'express';
import { contact } from './contact_book.routes';

const routes = Router();

routes.use(contact);

export {routes};