import { Request, Response } from "express";
import { pool } from '../config/database';
import { userSchema } from '../validator/joiSchema';


// GET USER-------------------------------------------------------------
export const getAllUsers = async (req: Request, res: Response) => {

  try {
    const users = await pool.query(
      'SELECT * FROM users',
    );
    res.status(200).json(users.rows);

  } catch (err: any) {

    console.error(err.message);
    res.status(500).json({ error: err.message });
  }

};
// GET USER BY ID-------------------------------------------------------------
export const getUserById = async (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
  // to be continued...🎈  https://www.youtube.com/watch?v=z7jkp40ydEI
}

// CREATE USER-------------------------------------------------------------
export const createUser = async (req: Request<{}, {}, { name: string, email: string }, {}>, res: Response) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    //Om valideringen misslyckas returneras ett felmeddelande
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(200).json(newUser.rows);

  } catch (err: any) {

    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

// UPDATE USER-------------------------------------------------------------
export const updateUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {

}

// DELETE USER-------------------------------------------------------------
export const deleteUser = async (req: Request<{}, {}, {}, {}>, res: Response) => {

}