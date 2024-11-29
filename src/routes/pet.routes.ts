import express from "express";
import { addPet, getPets, searchPets, updatePet, deletePet } from "../controllers/pet.controllers";

const router = express.Router();

router.post("/pets", addPet);
router.get("/pets", getPets);
router.get("/pets/search", searchPets);
router.put("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);

export default router;
