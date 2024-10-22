import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";  // Import the AppContext
import { Expense } from "../../types/types";  // Import the type for Expense
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState<string>(""); 
  const [cost, setCost] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
        //id: Date.now(),  // Simple ID generation, you may want a better approach
        id: uuidv4(),
        name: name,
        cost: parseFloat(cost),  // Convert the cost to a number
      };

    // Add new expense to the context array
    setExpenses([...expenses, newExpense]);

    // Clear form inputs
    setName("");
    setCost("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}  // Controlled input for name
            onChange={(e) => setName(e.target.value)}  // Update name state on change
            data-testid="input-name"
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"  // Use type="number" for cost to handle numeric input
            className="form-control"
            id="cost"
            value={cost}  // Controlled input for cost
            onChange={(e) => setCost(e.target.value)}  // Update cost state on change
            data-testid="cost-num"
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

//   return (
//     <form onSubmit={(event) => onSubmit(event)}>
//       <div className="row">
//         <div className="col-sm">
//           <label htmlFor="name">Name</label>
//           <input
//             required
//             type="text"
//             className="form-control"
//             id="name"
//             value={""}
//             // HINT: onChange={}
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//         </div>
//         <div className="col-sm">
//           <label htmlFor="cost">Cost</label>
//           <input
//             required
//             type="text"
//             className="form-control"
//             id="cost"
//             value={0}
//             // HINT: onChange={}
//             onChange={(e) => setCost(e.target.value)}
//           ></input>
//         </div>
//         <div className="col-sm">
//           <button type="submit" className="btn btn-primary mt-3">
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

export default AddExpenseForm;
