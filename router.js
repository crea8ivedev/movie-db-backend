import { Router } from "express";
import { login } from "./src/controllers/auth.controller.js";
import * as moviesController from "./src/controllers/movies.controller.js";
import {
  createMovieValidation,
  editMovieValidation,
} from "./src/validations/movies.validation.js";
import { loginValidation } from "./src/validations/auth.validation.js";

const router = new Router();

router.get("/auth/login", loginValidation, login);

router.get("/movies", moviesController.index);
router.get("/movies/:id", moviesController.show);
router.post("/movies", createMovieValidation, moviesController.update);
router.put("/movies/:id", editMovieValidation, moviesController.update);

export default router;
