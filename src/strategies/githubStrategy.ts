import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import pool from "../config/database";

//* github strategy

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "GitHub OAuth credentials are not set in the environment variables."
  );
}

passport.use(
  new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/github/callback",
  },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {


      try {
        // console.log(profile)

        // *Kolla om användaren redan finns
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [profile.username]
        );
        //* Om användaren redan finns
        if (existingUser.rows.length > 0) {
          return done(null, existingUser.rows[0])
        }

        //* Om användaren inte redan finns, lägg till en ny user
        const newUser = await pool.query(
          "INSERT INTO users (username, role, auth_type, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [profile.username, "user", "github", profile.email, "SuperSecretPassword123"]
        );
        return done(null, newUser.rows[0]);
      } catch (error) {
        return done(error)
      }
    }
  )
)

//* serialize github
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

//* deserialize github
passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query(
      "SELECT id, username, role FROM users WHERE id = $1",
      [id]
    );
    const user = result.rows[0];
    console.log("deserialized user", user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport; 