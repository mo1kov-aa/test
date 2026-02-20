import pool from "../config/database.js"

class UserDatabase{
    isUsernameTaken = async (username: string) => {
        return await pool.query('SELECT username from users where username =$1', [username])
    }

    createUser = async (name: string, username: string, password: string) => { 
        return await pool.query('INSERT INTO users(name, username, password) values ($1, $2, $3)', [name, username, password])
    }

    searchUser = async (username:string) => {
        const res = await pool.query('SELECT id, role, password from users where username =$1', [username])
        return res.rows[0]
    }
    
}

export default new UserDatabase()