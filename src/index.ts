import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import petRoutes from "./routes/pet.routes";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB();

// Rotas da API
app.use("/api", petRoutes);

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
