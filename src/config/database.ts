


const {Pool} = require('pg')

// Define connection details
export const pool = new Pool({
  host: 'localhost',          // PostgreSQL server hostname
  port: 5432,                 // Default port for PostgreSQL
  user: 'postgres',           // Your PostgreSQL username
  password: 'postgres',       // Your PostgreSQL password
  database: 'Ansiktsbok'      // The database you want to connect to
});

// export const dbCheck = async () => {
//   const client = await pool.connect();

//   try {
//     // Query the database
//     const result = await client.query('SELECT * FROM users');
//     // Access the data correctly
//     const data = result.rows
//     // [0]['current_user'];
//     console.log('Current user:', data);
//   } catch (err) {
//     console.error('Error executing query', err);
//   } finally {
//     // Release the client back to the pool
//     client.release();
//   }
// };

// // Run the function
// dbCheck();

