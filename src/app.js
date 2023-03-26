const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoClient = require('./models/mongoDB')
const router = require('./routes/Router.js')
const cors = require('cors')



/*app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Defining the routes
app.use(router)

//Solve CORS problem
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))

// Connect to MongoDB database
require('./config/db.js')


module.exports = app
