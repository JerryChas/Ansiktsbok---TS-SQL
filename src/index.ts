import express from 'express';
import userRoutes from './routes/userRoutes';
import helmet from 'helmet'
import cors from 'cors'
import registerRoute from './routes/registerUser.js'
import authRoutes from './routes/auth.js'
import "./strategies/local-strategy.js";
import "./strategies/githubStrategy.js";
import passport from 'passport';
import session from 'express-session'

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

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
    },
}))

app.use(cors(corsOptions));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/users', userRoutes)
app.use('/api', registerRoute)
app.use('/api', authRoutes)


app.get('/', (req, res) => {
    res.cookie('hello', 'world', { maxAge: 60000, sameSite: true, secure: true });
    res.status(200).send({ hej: 'hej' }) //nu lagras kakor iallefalle
    // const cookie = req.cookies;
    // console.log(cookie)
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


