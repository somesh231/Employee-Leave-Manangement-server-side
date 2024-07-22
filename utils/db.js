const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI;
// mongoose.connect('mongodb://localhost:27017/')

const connectDb = async ()=>{
    try{

        await mongoose.connect(URI);
        console.log("connection sucessful to DB");

    }catch(err){
        console.error("database connection failed")
        console.log(err)
        process.exit(0);
    }
};

module.exports = connectDb;
