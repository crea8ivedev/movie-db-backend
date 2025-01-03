import { Router } from "express";
import * as moviesController from "./src/controllers/movies.controller.js";
import {
  createMovieValidation,
  editMovieValidation,
} from "./src/validations/movies.validation.js";
import { loginValidation } from "./src/validations/auth.validation.js";
import * as authController from "./src/controllers/auth.controller.js";
import { upload } from "./src/utils/multer.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";

const router = new Router();

router.post("/auth/login", loginValidation, authController.login);
router.delete("/auth/logout", authController.logout);

router.get("/movies", authMiddleware, moviesController.index);
router.get("/movies/:id", authMiddleware, moviesController.show);
router.post(
  "/movies",
  
  upload.single("poster"),
  createMovieValidation,
  moviesController.create
);
router.put(
  "/movies/:id",
  authMiddleware,
  upload.single("poster"),
  editMovieValidation,
  moviesController.update
);

export default router;
