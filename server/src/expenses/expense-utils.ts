import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

// export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
//     const { id, cost, description } = req.body;

//     if (!description || !id || !cost) {
//         return res.status(400).send({ error: "Missing required fields" });
//     }

//     const newExpense: Expense = {
//         id: id,
//         description,
//         cost,
//     };

//     expenses.push(newExpense);
//     res.status(201).send(newExpense);
// }
export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
 
// export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
//     const { id } = req.params;
//     const initialLength = expenses.length;

//     // Remove the expense with the matching ID
//     const updatedExpenses = expenses.filter(expense => expense.id !== id);

//     if (updatedExpenses.length === initialLength) {
//         // No expense found with the given ID
//         return res.status(404).send({ error: "Expense not found" });
//     }

//     // Update the expenses array in place (if this is intended to be a mutable array)
//     expenses.length = 0;
//     expenses.push(...updatedExpenses);
// }
export async function deleteExpense(req: Request, res: Response, db: Database) {
    try {
        const { id } = req.params;

        const expense = await db.get('SELECT * FROM expenses WHERE id = ?', [id]);
        
        if (!expense) {
            return res.status(404).send({ error: "Expense not found" });
        }

        // Delete the expense if it exists
        await db.run('DELETE FROM expenses WHERE id = ?', [id]);
        return res.status(200).send({ message: "Expense deleted successfully" });

    } catch (error) {
        return res.status(500).send({ error: `Could not delete expense: ${error}` });
    }
}


// export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
//     res.status(200).send({ "data": expenses });
// }
export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        // Get all rows from the expenses table
        const expenses = await db.all('SELECT * FROM expenses');
        
        // Return the expenses in the same format as before
        res.status(200).send({ "data": expenses });
        
    } catch (error) {
        return res.status(500).send({ error: `Could not fetch expenses: ${error}` });
    }
}