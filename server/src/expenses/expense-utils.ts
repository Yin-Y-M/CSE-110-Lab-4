import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    //test
    console.log("createExpenseServer function triggered");
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    console.log("deleteExpense function triggered"); // Log to confirm the function call
    console.log("Request params:", req.params);
    // TO DO: Implement deleteExpense function
    console.log("deleteExpense function triggered");
    console.log("Request params:", req.params);

    const { id } = req.params;
    const initialLength = expenses.length;

    // Remove the expense with the matching ID
    const updatedExpenses = expenses.filter(expense => expense.id !== id);

    if (updatedExpenses.length === initialLength) {
        // No expense found with the given ID
        return res.status(404).send({ error: "Expense not found" });
    }

    // Update the expenses array in place (if this is intended to be a mutable array)
    expenses.length = 0;
    expenses.push(...updatedExpenses);
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}