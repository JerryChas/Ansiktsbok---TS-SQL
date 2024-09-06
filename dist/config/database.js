import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
// <🦝----✨----✨-----🍋-✨----- Connection ------✨-🍋----✨----✨----🦝>
const pool = new pkg.Pool({
    connectionString: process.env.DB_URL
});
export default pool;
