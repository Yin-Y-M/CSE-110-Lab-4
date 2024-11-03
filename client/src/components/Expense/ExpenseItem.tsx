import { Expense } from "../../types/types";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
//sth new added 10.28
import { fetchExpenses, deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext); 

  //Original const handleDeleteExpense
  const handleDeleteExpense = (currentExpense: Expense) => {
    deleteExpense(currentExpense.id)
      .then(() => {
        // Fetch updated expenses list after deletion
        return fetchExpenses();
      })
    // Exercise: Remove expense from expenses context array
    const updatedExpenses = expenses.filter(expense => expense.id !== currentExpense.id);

    // Update the expenses context with the new array
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
