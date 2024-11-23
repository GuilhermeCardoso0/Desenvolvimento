import { Router } from "express";
import controller from "../controllers/ExpenseController";

const routes = Router();

routes.post("/", controller.create.bind(controller));   
routes.get("/", controller.list.bind(controller));     
routes.put("/", controller.update.bind(controller));    
routes.delete("/", controller.delete.bind(controller)); 
routes.get("/total", controller.getTotal.bind(controller)); 

export default routes;