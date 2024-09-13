import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import pool from "../config/database.js";

const router = Router();

// * LOGIN



// * Github login route

// router.get(
//   "/auth/github",
//   passport.authenticate("github", { scope: ["user:email"] })
// );

//github test route
router.get("/auth/github", (req, res, next) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/api/auth/github/callback"
    )}&scope=user:email`;

  console.log("GitHub Auth URL:", githubAuthURL);

  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.json({
      message: "Github Auth successful",
    });
  }
);

export default router;