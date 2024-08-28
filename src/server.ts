import express from 'express';
// import { dbCheck } from './config/database';
import { pool } from './config/database';
import { userSchema } from './validator/joiSchema';

import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(express.json())

// ROUTES ฅᨐฅ 🛣️
app.get("/", (req, res) => {
    res.send('Hello World! första sidan');
})



// SKAPA EN ANVÄNDARE ฅᨐฅ 🚼
app.post("/api/users", async (req, res) => {

})

// ELIMINERA EN ANVÄNDARE ฅᨐฅ 🗡️
app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE $1 = id RETURNING *', [id]
        );
        res.status(200).json(result.rows);

    } catch (err: any) {

        console.error(err.message);
        res.status(500).json({ error: err.message });
    }

})


// ÄNDRA EN ANVÄNDARE ฅᨐฅ ✂️
app.put("/api/users/:id", async (req, res) => {
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

    } catch (err: any) {

        console.error(err.message);
        res.status(500).json({ error: err.message });
    }

})


app.use('/api/users', userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


