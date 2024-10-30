import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext); // Access budget from context

  // Fetch budget on component mount
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
    try {
      const fetchedBudget = await fetchBudget();
      setBudget(fetchedBudget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div> {/* Use context-based budget here */}
    </div>
  );
};

export default Budget;
