import { Router, Request, Response } from "express";
import expenseRoutes from './expenseRoutes';

const routes = Router();

routes.use("/expense", expenseRoutes);

routes.use("*", (_: Request, res: Response) => {
    res.status(404).json({ error: "Requisição desconhecida" });
});

export default routes;
