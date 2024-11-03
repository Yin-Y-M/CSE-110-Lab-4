import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(budget.toString());

  // Fetch budget on component mount
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load budget and handle errors
  const loadBudget = async () => {
    try {
      const fetchedBudget = await fetchBudget();
      setBudget(fetchedBudget);
    } catch (err: any) {
      console.error('Error loading budget:', err);
    }
  };

  // Function to handle budget update
  const handleUpdate = async () => {
    try {
      const newBudget = Number(editValue);
      if (isNaN(newBudget) || newBudget < 0) {
        alert('Please enter a valid budget amount');
        return;
      }

      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error updating budget:', err);
      alert('Failed to update budget');
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {!isEditing ? (
        <>
          <div>Budget: ${budget}</div>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            className="form-control w-50"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div>
            <button 
              className="btn btn-primary btn-sm me-2" 
              onClick={handleUpdate}
            >
              Save
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIsEditing(false);
                setEditValue(budget.toString());
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Budget;