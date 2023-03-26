const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongoUri = process.env.MONGODB_URI;

const conn = async () => {

    console.log('passei aqui')
    try {

        const dbConn = await mongoose.connect(mongoUri)
        console.log('Connected to MongoDB database')
        return dbConn

    } catch (error) {
        console.log(`Error connecting to database: ${error}`)
    }

}
conn()

module.exports = conn;