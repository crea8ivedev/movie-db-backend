import { Joi, validate } from "express-validation";

export const loginValidation = validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean(),
  }),
});
