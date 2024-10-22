// src/context/AppContext.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "./AppContext"; 
import AddExpenseForm from "../components/Expense/AddExpenseForm"; 
import Remaining from "../components/Remaining";
import Budget from "../components/Budget/Budget";
import ExpenseList from "../components/Expense/ExpenseList";
import { waitFor } from "@testing-library/react";

describe("Budget Tracker Application", () => {
  test("Create an Expense", () => {
    render(
      <AppProvider>
        <Budget />
        <AddExpenseForm />
        <Remaining />
        <ExpenseList />
      </AppProvider>
    );

    // Add an expense
    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "MyExpense" } });
    fireEvent.change(screen.getByTestId("cost-num"), { target: { value: "200" } });
    fireEvent.click(screen.getByRole('button', { name: "Save" }));

    //Verify the new expense is added
    expect(screen.getByText("MyExpense")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    // Check total expenses and remaining budget
    
    expect(screen.getByTestId("remaining-alert")).toHaveTextContent("Remaining: $800"); // Assuming initial budget is $1000
    screen.debug()
  });

  test("Delete an Expense", () => {
    render(
      <AppProvider>
        <Budget />
        <AddExpenseForm />
        <Remaining />
        <ExpenseList />
      </AppProvider>
    );
  
    // Add an expense to delete
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Expense to Delete" } });
    fireEvent.change(screen.getByLabelText("Cost"), { target: { value: "100" } });
    fireEvent.click(screen.getByText("Save"));
  
    // Verify expense is in the document
    expect(screen.getByText("Expense to Delete")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  
    // Delete the expense
    fireEvent.click(screen.getByText("x")); 
  
    // Verify expense is removed
    expect(screen.queryByText("Expense to Delete")).not.toBeInTheDocument();
    expect(screen.getByTestId("remaining-alert")).toHaveTextContent("Remaining: $1000"); // Updated remaining
  });

  test("Budget Balance Verification", () => {
    render(
      <AppProvider>
        <Budget />
        <AddExpenseForm />
        <Remaining />
        <ExpenseList />
      </AppProvider>
    );

    const initialBudget = 1000; // Assuming the initial budget is $1000

    // Add first expense
    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Expense1" } });
    fireEvent.change(screen.getByTestId("cost-num"), { target: { value: "200" } });
    fireEvent.click(screen.getByRole('button', { name: "Save" }));

    // Add second expense
    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Expense2" } });
    fireEvent.change(screen.getByTestId("cost-num"), { target: { value: "150" } });
    fireEvent.click(screen.getByRole('button', { name: "Save" }));

    // Verify the new expenses are added
    expect(screen.getByText("Expense1")).toBeInTheDocument();
    expect(screen.getByText("Expense2")).toBeInTheDocument();

    // Check if the remaining balance and total expenditure are correct
    const totalExpenditure = 200 + 150; // Sum of expenses
    const remainingBalance = initialBudget - totalExpenditure;

    // Verify the budget equation holds true
    expect(screen.getByTestId("remaining-alert")).toHaveTextContent(`Remaining: $${remainingBalance}`);

    // Extra verification: Check total expenses directly (optional depending on your component)
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("$150")).toBeInTheDocument();

    screen.debug();
  });
});
