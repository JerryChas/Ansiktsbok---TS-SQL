import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


// // ROUTES ฅᨐฅ 🛣️
// app.get("/", (req, res) => {
//     res.send('Hello World! första sidan');
// })

// // SKAPA EN ANVÄNDARE ฅᨐฅ 🚼
// app.post("/api/users", async (req, res) => {
// })

// ELIMINERA EN ANVÄNDARE ฅᨐฅ 🗡️
// app.delete("/api/users/:id", async (req, res) => {
// const id = req.params.id;

// try {
//     const result = await pool.query(
//         'DELETE FROM users WHERE $1 = id RETURNING *', [id]
//     );
//     res.status(200).json(result.rows);

// } catch (err: any) {

//     console.error(err.message);
//     res.status(500).json({ error: err.message });
// }

// })

// ÄNDRA EN ANVÄNDARE ฅᨐฅ ✂️
// app.put("/api/users/:id", async (req, res) => {

// })
