import { ValidationError } from "express-validation";

export default function validationException(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  next(err);
}
