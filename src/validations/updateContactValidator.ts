import { AppError } from "./../errors/AppError";
import { Request } from "express";
import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    telephones: Joi.array().min(1).items(Joi.string())
});

const updateContactValidator = (request: Request) =>{
    const result = schema.validate(request);

    if(result.error){
        throw new AppError(result.error.message, 400);
    }

    return null
}

export {updateContactValidator};