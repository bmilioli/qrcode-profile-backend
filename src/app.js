const express = require("express");
const app = express();
const router = require("./routes/Router.js");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

/*app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Defining the routes
app.use(router);

//Solve CORS problem
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// Connect to MongoDB database
require("./config/db.js");

// Configurar a porta do servidor

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
