// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    try {
      const response = await fetch('/api/budget'); // Make sure this is the correct endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch budget');
      }
      const data = await response.json();
      return data.budget; // Assuming the backend returns an object with a budget field
    } catch (error) {
      console.error('Error fetching budget:', error);
      throw error;
    }
};
  