const express = require("express");
const app = express();
const router = require("./routes/Router.js");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//Solve CORS problem
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Defining the routes
app.use(router);



// Connect to MongoDB database
require("./config/db.js");

// Configurar a porta do servidor

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
