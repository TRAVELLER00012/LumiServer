process.env.NODE_ENV = 'development';
process.env.lumi_jwtPrivateKey="mySecureKey";
const express = require("express")

const app = express()

require('./startup/db')();
require('./startup/routes')(app);


console.log("ENV: "+ process.env.NODE_ENV);

const port = process.env.PORT || 3000

const server =  app.listen(port,() =>{
    console.log("Listening on port: " + port);
})

module.exports = server