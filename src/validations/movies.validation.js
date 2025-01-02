import { Joi, validate } from "express-validation";

export const createMovieValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
  }),
});

export const editMovieValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
  }),
});
