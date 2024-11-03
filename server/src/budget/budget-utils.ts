import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    try {
        // Validate the incoming budget amount
        const newAmount = Number(body.amount);
        if (isNaN(newAmount) || newAmount < 0) {
            res.status(400).send({ "error": "Invalid budget amount" });
            return;
        }

        // Update the budget
        budget.amount = newAmount;
        
        // Send back the updated budget
        res.status(200).send({ "data": budget.amount });
    } catch (error) {
        console.error("Error updating budget:", error);
        res.status(500).send({ "error": "Internal server error" });
    }
}
