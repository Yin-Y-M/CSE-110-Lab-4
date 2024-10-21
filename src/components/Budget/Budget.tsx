import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget } = useContext(AppContext); // Access budget from context

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div> {/* Use context-based budget here */}
    </div>
  );
};

export default Budget;
