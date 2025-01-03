import { Joi, validate } from "express-validation";

export const loginValidation = validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    rememberMe: Joi.boolean().default(false),
  }),
});
