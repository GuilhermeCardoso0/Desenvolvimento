import { Request, Response, NextFunction } from "express";

export const validatePetData = (req: Request, res: Response, next: NextFunction) => {
    const { nome, especie, idade, tutor } = req.body;
    if (!nome || !especie || !idade || !tutor) {
        return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos!" });
    }
    next();
};
