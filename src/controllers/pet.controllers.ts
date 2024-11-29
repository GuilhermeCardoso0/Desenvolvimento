import { Request, RequestHandler, Response } from "express";
import Pet, { IPet } from "../models/pet.model";

// Criar
export const addPet = async (req: Request, res: Response) => {
    try {
        const pet: IPet = new Pet(req.body);
        await pet.save();
        res.status(201).json({ message: "Pet adicionado com sucesso!", pet });
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

// Ler todos
export const getPets = async (_: Request, res: Response) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Buscar por nome ou espécie
export const searchPets = async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const pets = await Pet.find({
            $or: [
                { nome: new RegExp(query as string, "i") },
                { especie: new RegExp(query as string, "i") }
            ]
        });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// Atualizar
export const updatePet = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
        if (!pet) return res.status(404).json({ error: "Pet não encontrado!" });
        res.json({ message: "Pet atualizado!", pet });
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

// Remover
export const deletePet = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const pet = await Pet.findByIdAndDelete(id);
        if (!pet) return res.status(404).json({ error: "Pet não encontrado!" });
        res.json({ message: "Pet removido!" });
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};
