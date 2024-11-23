import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection";
import expenseRoutes from "./routes/expenseRoutes";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

connect();

app.use("/expense", expenseRoutes);

app.use("*", (_, res) => {
  res.status(404).json({ error: "Rota desconhecida" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
