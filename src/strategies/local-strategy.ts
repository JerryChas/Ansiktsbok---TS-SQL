import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../config/database";
import { Response, Request, NextFunction } from "express";
// HASHING
import bcrypt from "bcrypt";


interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      role: string;
    }
  }
}

//* Strategy för vår lokala passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = result.rows[0];
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' })
      }

      //* BCRYPT 
      // const isMatch = await bcrypt.compare(password, user.password)

      // if (!isMatch) {
      //   return done(null, false, { message: "Incorrect username or password" });
      // }

      return done(null, {
        id: user.id,
        username: user.username,
        role: user.role,
      });

    } catch (error) {
      return done(error)
    }
  })
);


//* serializeuser
passport.serializeUser((user: any, done) => {
  done(null, user.id);
})




//* deserializeuser
passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query(
      "SELECT id, username, role FROM users WHERE id = $1", [id]
    )
    const user = result.rows[0];
    console.log("deserialize user", user);
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})


//* authorize function
export function authorize(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("user from authorize:", req.user);
    console.log("allowed", allowed);
    const user = req.user as User | undefined;
    // om inloggad, är användare och har tillåten roll...
    if (req.isAuthenticated() && user && allowed.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized!" });
    }
  };
}

export default passport;