import express from "express";
import { routes } from "routes/routes";
import "reflect-metadata";
import "./database/connection";
import errorMiddleware from "middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export { app };
