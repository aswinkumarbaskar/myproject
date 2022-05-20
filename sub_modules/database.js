const mongoose = require("mongoose");
const config = require("../config/config").config;

module.exports = () => {


    let fullMongoUri = config.dbHost;

    mongoose.connect(
        "mongodb+srv://Aswinkumarbaskar:55726368@cluster0.w2hmv.mongodb.net/sampleDB?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
        }
    ).then(res => {
        console.error('connected successfully to MongoDB:')
    }).catch(err=>{
        console.log(err);
    })

}

