const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.listen(3000, console.log("Servidor Levantado en el puerto 3000!"));

app.use(express.json());

const index = path.join(__dirname, "index.html");
