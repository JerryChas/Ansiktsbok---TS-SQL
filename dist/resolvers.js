const createResolvers = (pool) => ({
    Query: {
        // <----------- READ ----------------->
        users: async () => {
            const result = await pool.query("SELECT * FROM users");
            return result.rows;
        },
        user: async (_, args) => {
            const result = await pool.query("SELECT * FROM users WHERE id = $1", [
                args.id,
            ]);
            return result.rows[0] || null;
        },
        // Lägg till fler queries för Post
    },
    Mutation: {
        createUser: async (_, args) => {
            const result = await pool.query("INSERT INTO users(name, email) VALUES($1, $2) RETURNING *", [args.name, args.email]);
            return result.rows[0];
        },
        // Lägg till fler mutationer för User och Post
    },
    // Lägg till relationer med parent här
});
export default createResolvers;
