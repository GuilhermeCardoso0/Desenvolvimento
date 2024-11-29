import mongoose, { Schema, Document } from "mongoose";

export interface IPet extends Document {
    nome: string;
    especie: string;
    idade: number;
    tutor: string;
    contatoTutor?: string;
    emTratamento: boolean;
}

const PetSchema: Schema = new Schema({
    nome: { type: String, required: true },
    especie: { type: String, required: true },
    idade: { type: Number, required: true },
    tutor: { type: String, required: true },
    contatoTutor: { type: String },
    emTratamento: { type: Boolean, default: false }
});

export default mongoose.model<IPet>("Pet", PetSchema);
