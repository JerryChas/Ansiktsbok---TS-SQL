import { Request, Response } from "express";
import { pool } from '../config/database';
import { userSchema } from '../validator/joiSchema';
import { CreateUserDto } from "../dtos/CreateUser.dtos";
import { UpdateUserDto } from "../dtos/UpdateUser.dtos";
import { errorHandler } from "../utils/errorHandler";
import { userQueryParams } from "../types/query-params";
import { ErrorResponse, UserResponse } from "../types/response";

// GET USERS-------------------------------------------------------------
export const getAllUsers = async (req: Request<{ id: string }, {}, {}, userQueryParams>, res: Response<UserResponse | ErrorResponse>) => {

  try {

    const users = await pool.query(
      'SELECT * FROM users',
    );
    res.status(200).json(users.rows);


  } catch (err) {
    errorHandler(err)
    res.status(500).json({ error: err });
  }

};
// GET USER BY ID-------------------------------------------------------------
export const getUserById = async (req: Request<{ id: string }, {}, {}, {}>, res: Response<UserResponse | ErrorResponse>) => {
  const { id } = req.params;

  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    if (user.rows.length === 0) {
      return res.status(404).json({ error: '404 User not found' });
    }

    res.status(200).json(user.rows)
  } catch (err) {
    errorHandler(err)
    res.status(500).json({ error: err });
  }
};

// CREATE USER-------------------------------------------------------------
export const createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response<UserResponse | ErrorResponse>) => {
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

  } catch (err) {
    errorHandler(err)
    res.status(500).json({ error: err });
  }

}
// UPDATE USER-------------------------------------------------------DTO⬇️
export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDto, {}>, res: Response<UserResponse | ErrorResponse>) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    //Om valideringen misslyckas returneras ett felmeddelande
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, email } = req.body;
  const id = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE $3 = id RETURNING *', [name, email, id]
    );
    res.status(200).json(result.rows);

  } catch (err) {
    errorHandler(err)
    res.status(500).json({ error: err });
  }
}

// DELETE USER-------------------------------------------------------------
export const deleteUser = async (req: Request<{ id: string }, {}, {}, {}>, res: Response<UserResponse | ErrorResponse>) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE $1 = id RETURNING *', [id]
    );
    res.status(200).json(result.rows);

  } catch (err) {
    errorHandler(err)
    res.status(500).json({ error: err });
  }
}
