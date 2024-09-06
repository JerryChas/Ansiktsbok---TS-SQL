import pool from './config/database';
import { Pool } from "pg";

// Definiera typer
type User = {
  id: number;
  name: string;
  email: string;
};

type EditUser = {
  name: string;
  email: string;
}

type Post = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  nsfw: boolean;
}

type EditPost = {
  title: string;
  description: string;
  nsfw: boolean;
}

const createResolvers = (pool: Pool) => ({
  Query: {
    //* <----------- READ USERS 🦝----------------->
    users: async (): Promise<User[]> => {
      const result = await pool.query("SELECT * FROM users");
      return result.rows;
    },
    user: async (_: any, args: { id: number }): Promise<User | null> => {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        args.id,
      ]);
      return result.rows[0] || null;
    },
    //* <----------- READ POSTS 🦝----------------->
    posts: async () => {
      const result = await pool.query("SELECT * FROM posts");
      return result.rows;
    },
    post: async (_: any, args: { id: number }) => {
      const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
        args.id,
      ]);
      return result.rows[0] || null;
    },
  },
  //* <----------- RELATIONS 🦝----------------->
  // User: {
  //   async posts(parent: any) { }
  // },

  //* <----------- MUTATIONS 🦝 ----------------->
  Mutation: {
    //* <----------- CREATE USER 🦝----------------->
    createUser: async (
      _: any,
      args: { user: User }
    ): Promise<User> => {
      const result = await pool.query(
        "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
        [args.user.name, args.user.email]
      );
      return result.rows[0];
    },
    //* <----------- UPDATE USER 🦝----------------->
    async updateUser(_: any, args: { id: number, edits: EditUser }) {
      const id = args.id
      const { name, email } = args.edits

      const updatedUser = await pool.query(`
        UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3 RETURNING *`,
        [name, email, id])
      return updatedUser.rows[0]
    },
    //* <----------- DELETE USER 🦝----------------->
    async deleteUser(_: any, args: { id: number }) {
      const { id } = args
      const deletedUser = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id])
      return deletedUser.rows[0]
    },
    //!===🎈=====🍬====🎈========🍬======🥜===========🎈====================🥜==========🎈========🍬========

    //* <----------- CREATE POST🦝🍬----------------->
    createPost: async (
      _: any,
      args: { post: Post }
    ) => {
      const { title, description, user_id, nsfw } = args.post;
      const result = await pool.query(
        "INSERT INTO posts(title, description, user_id, nsfw) VALUES($1, $2, $3, $4) RETURNING *",
        [title, description, user_id, nsfw]
      );
      return result.rows[0];
    },
    //* <----------- UPDATE POST🦝🍬----------------->
    async updatePost(_: any, args: { id: number, edits: EditPost }) {
      const id = args.id
      const { title, description, nsfw } = args.edits

      const updatedPost = await pool.query(`
        UPDATE posts SET title = COALESCE($1, title), description = COALESCE($2, description), nsfw = COALESCE($3, nsfw) WHERE id = $4 RETURNING *`,
        [title, description, nsfw, id])
      return updatedPost.rows[0]
    },
    //* <----------- DELETE POST🦝🍬----------------->
    async deletePost(_: any, args: { id: number }) {
      const { id } = args
      const deletedPost = await pool.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id])
      return deletedPost.rows[0]
    },


  }
  // Lägg till relationer med parent🦝 här
});

export default createResolvers;
