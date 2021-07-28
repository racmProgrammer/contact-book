  
import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message, status: "error" });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`
  });
};