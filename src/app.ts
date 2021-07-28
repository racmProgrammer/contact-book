import express from "express";
import { routes } from "routes/routes";
import "reflect-metadata";
import "./database/connection";

const app = express();

app.use(express.json());
app.use(routes);

export { app };
