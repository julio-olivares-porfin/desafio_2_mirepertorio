const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.listen(3000, console.log("Servidor arriba en el puerto 3000"));

app.use(express.json());

const index = path.join(__dirname, "index.html");

app.get("/", (req, res) => {
  res.sendFile(index);
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const rep = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  repertorio.push(rep);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Canción agregada con Exito");
});

