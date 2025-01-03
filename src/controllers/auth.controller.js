import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma.js";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return done(new Error("User not found"), null);
    delete user.password;
    return done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid credentials" });
        }
        delete user.password;
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export async function login(req, res, next) {
  try {
    passport.authenticate("local", async (error, user, info) => {
      if (error || !user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }
        if (!!req.body.rememberMe) {
          req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
        } else {
          req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
        }
        return res.json({
          message: "User login successfully",
        });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  req.logout(() => {
    req.session.destroy(function () {});
  });
  res.json({});
}

export default passport;
