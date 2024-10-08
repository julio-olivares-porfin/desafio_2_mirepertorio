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
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
  } catch (error) {
    res.status(500).send("Error al leer el repertorio.");
  }
});

app.post("/canciones", (req, res) => {
  const rep = req.body;
  try {
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
    repertorio.push(rep);
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
    res.send("Canción agregada con éxito!");
  } catch (error) {
    res.status(500).send("Error al agregar la canción.");
  }
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const rep = req.body;
  try {
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = repertorio.findIndex((p) => p.id == id);

    if (index === -1) {
      return res.status(404).send("Canción no encontrada.");
    }

    repertorio[index] = rep;
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
    res.send("Canción modificada con éxito");
  } catch (error) {
    res.status(500).send("Error al modificar la canción.");
  }
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  try {
    const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = repertorio.findIndex((p) => p.id == id);

    if (index === -1) {
      return res.status(404).send("Canción no encontrada.");
    }

    repertorio.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
    res.send("Canción eliminada con éxito");
  } catch (error) {
    res.status(500).send("Error al eliminar la canción.");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal.");
});