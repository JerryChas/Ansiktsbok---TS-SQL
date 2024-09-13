import { Router } from "express";
import pool from "../config/database";
import bcrypt from "bcrypt";

const router = Router()

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body
  try {
    // * Hash the password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role`,
      [username, password /* hashedPassword */, role]
    )


  } catch (err) {
    res.status(500).send("internal server error🔥🔥🔥")
  }
  res.send("Register user");
});


export default router;