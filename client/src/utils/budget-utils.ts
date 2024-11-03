import { API_BASE_URL } from "../constants/constants";
// Function to get budget from the backend. Method: GET
// export const fetchBudget = async (): Promise<number> => {
//     try {
//       const response = await fetch('${API_BASE_URL}/budget'); // Make sure this is the correct endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch budget');
//       }
//       const data = await response.json();
//       return data.budget; // Assuming the backend returns an object with a budget field
//     } catch (error) {
//       console.error('Error fetching budget:', error);
//       throw error;
//     }
// };
  
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "GET"
	});
	if (!response.ok) {
    	throw new Error("Failed to fetch budget");
	}
    let budget = response.json().then((jsonResponse) => {
    	return jsonResponse.data;
	});
	return budget;
};

// Function to update the budget in the backend
export const updateBudget = async (budget: number): Promise<number> => {
    try {
        const response = await fetch('http://localhost:8080/budget', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: budget })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating budget:', error);
        throw error;
    }
};