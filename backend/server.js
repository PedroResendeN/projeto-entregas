import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

const ORIGIN = "Av. João Naves de Ávila, 1331 - Piso 1 - Tibery, Uberlândia";

app.get("/directions", async (req, res) => {
  try {
    const { destination } = req.query;
    const apiKey = "AIzaSyB27Mctu-I2zZjHhXrSuLN_M7tuzfFxdGY";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      ORIGIN
    )}&destination=${encodeURIComponent(
      destination
    )}&mode=driving&key=${apiKey}`;

    const response = await axios.get(url);
    const travelTime = response.data.routes[0].legs[0].duration.text;
    res.json({ travelTime });
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o tempo de viagem" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
