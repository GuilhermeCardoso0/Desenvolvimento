import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Expense", ExpenseSchema);
