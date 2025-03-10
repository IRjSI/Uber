import mongoose from "mongoose";


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
    .catch( (err) => console.log('error while connecting to DB::', err) )
}

export default connectToDb;