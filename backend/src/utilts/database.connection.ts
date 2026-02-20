import pool from "../config/database.js";

const dbConnection = async() =>{
    try{
        const dbReq = await pool.connect()
        console.log(`Success database connection`)
        dbReq.release()
        return true
    }catch(err){
        console.log(`Database connection error: `, err)
        return false
    }
}

export default dbConnection