const mongoose = require("mongoose")

module.exports = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/lumi_db")
        .then(() => console.log("CONNECTED TO DB: LOCALHOST"))
        .catch(err => console.log(err.message))
}