process.env.NODE_ENV = 'development';
process.env.lumi_jwtPrivateKey="mySecureKey";
const express = require("express")
const cors = require("cors")
const app = express()

if (process.env.NODE_ENV == "development")
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
        exposedHeaders: ['x-auth-token'],
        credentials: true
    }));

app.use(express.json())

require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);


console.log("ENV: "+ process.env.NODE_ENV);

const port = process.env.PORT || 3000

const server =  app.listen(port,() =>{
    console.log("Listening on port: " + port);
})

module.exports = server