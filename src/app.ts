import "express-async-errors";
import "reflect-metadata";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import { routes } from "./routes/routes";
import "./database/connection";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export { app };
