import express from 'express';
// import { dbCheck } from './config/database';
import {pool} from './config/database';
import { userSchema } from './validator/joiSchema';

const app = express();
const PORT = 3000;

app.use(express.json())

// ROUTES ฅᨐฅ 🛣️
app.get("/", (req, res) => {
    res.send('Hello World! första sidan');
})

// VISAR ANVÄNDARE ฅᨐฅ 🔍
app.get("/api/users", async (req, res) => {

  try {
        const users = await pool.query(
            'SELECT * FROM users',
        );
        res.status(200).json(users.rows);
        // res.send(newUser.rows)
        // console.log(typeof newUser, "detta är typen")
    } catch (err: any) {

        console.error(err.message);
        res.status(500).json({error: err.message});
    }

})

// SKAPA EN ANVÄNDARE ฅᨐฅ 🚼
app.post("/api/users", async (req, res) => {
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
        res.status(500).json({error: err.message});
    }

})

// ELIMINERA EN ANVÄNDARE ฅᨐฅ 🗡️
app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    
    try {
          const result = await pool.query(
              'DELETE FROM users WHERE $1 = id RETURNING *',[id]    
          );
          res.status(200).json(result.rows);
       
      } catch (err: any) {
  
          console.error(err.message);
          res.status(500).json({error: err.message});
      }
  
  })


// ÄNDRA EN ANVÄNDARE ฅᨐฅ ✂️
app.put("/api/users/:id", async (req, res) => {
const { error } = userSchema.validate(req.body);

if (error) {
//Om valideringen misslyckas returneras ett felmeddelande
return res.status(400).json({ error: error.details[0].message });
}
    const {name, email } = req.body;
    const id = req.params.id;

    try {
          const result = await pool.query(
              'UPDATE users SET name = $1, email = $2 WHERE $3 = id RETURNING *',[name, email, id]          
          );
          res.status(200).json(result.rows);
       
      } catch (err: any) {
  
          console.error(err.message);
          res.status(500).json({error: err.message});
      }
  
  })


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  

