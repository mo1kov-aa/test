import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({path: "src/config/.env"})

const pool = new pg.Pool({
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

export default pool