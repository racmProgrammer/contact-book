import express from "express";

const app = express();

app.get("/test", (request, response) => {
  response.send("Hello");
});

export { app };
