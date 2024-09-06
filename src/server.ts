import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


