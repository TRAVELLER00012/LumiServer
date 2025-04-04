process.env.NODE_ENV = 'development';
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded(true))

console.log("ENV: "+ process.env.NODE_ENV);

const port = process.env.PORT || 3000

const server =  app.listen(port,() =>{
    console.log("Listening on port: " + port);
})

module.exports = server