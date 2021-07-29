import { AppError } from "./../errors/AppError";
import { Request } from "express";
import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    telephones: Joi.array().min(1).items(Joi.string()).required()
});

const createContactValidator = (request: Request) =>{
    const result = schema.validate(request);

    if(result.error){
        throw new AppError(result.error.message, 400);
    }

    return null
}

export {createContactValidator};