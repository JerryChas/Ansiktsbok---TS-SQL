const updateDatabase = async () => {
  try {


    //         const table = await pool.query(`SELECT column_name, data_type, column_default
    // FROM information_schema.columns
    // WHERE table_name = 'posts'`)
    //         console.log(table.rows)

    //         const postsWithNull = await pool.query(`ALTER TABLE posts
    // ALTER COLUMN created_at SET DEFAULT NOW()`)
    //         console.log(postsWithNull.rows)


    // const postsWithNull = await pool.query(`SELECT * FROM posts WHERE created_at IS NULL`)
    // console.log(postsWithNull.rows)

    // await pool.query(`UPDATE posts SET created_at = NOW() WHERE created_at IS NULL`)

    console.log('Database updated successfully');
  } catch (error: any) {
    console.error(error.message)
  }
}

export default updateDatabase