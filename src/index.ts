import express from 'express';
import userRoutes from './routes/userRoutes';
import helmet from 'helmet'
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(
    helmet({
        contentSecurityPolicy: false,
        xDownloadOptions: false,
    }),
);

const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? "https://your-frontend-url.com"
        : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: process.env.NODE_ENV === "production"
        ? ["Content-Type", "Authorization"]
        : ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.cookie('hello', 'world', { maxAge: 60000, sameSite: true, secure: true });
    res.status(200).send({ hej: 'hej' }) //nu lagras kakor iallefalle
    // const cookie = req.cookies;
    // console.log(cookie)
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


