import app from './app.js'
import dbConnection from './utilts/database.connection.js'

const dbReq = await dbConnection()

if(dbReq){
    const port = process.env.PORT

    const server = app.listen(port , ()=>{
        console.log(`Server: http://localhost:${port}`)
    })

    server.on('error', (err)=>{
        console.log('Server error: ', err)
    })
}else{
    console.log(`Server was not started`)
}