import express from "express";
import "dotenv/config";
import session from "express-session";
import passport from "passport";
import path from "path";
import cors from "cors";
import router from "./router.js";
import globalException from "./src/exceptions/global.exception.js";
import validationException from "./src/exceptions/validation.exception.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config.js";
import basicAuth from "./src/middlewares/basic-auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(express.json({ limit: "3mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve("public")));

app.use("/api-docs", basicAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

app.use(validationException);
app.use(globalException);

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
