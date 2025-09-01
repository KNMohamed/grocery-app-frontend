import type {
  GroceryList,
  CreateGroceryListRequest,
  UpdateGroceryListRequest,
} from "../types/grocery";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1";

export const groceryListsApi = {
  // Get all grocery lists
  getAll: async (): Promise<GroceryList[]> => {
    const response = await fetch(`${API_BASE_URL}/grocery-lists`);
    if (!response.ok) {
      throw new Error("Failed to fetch grocery lists");
    }
    return response.json();
  },

  // Create a new grocery list
  create: async (data: CreateGroceryListRequest): Promise<GroceryList> => {
    console.log(JSON.stringify(data));
    const response = await fetch(`${API_BASE_URL}/grocery-lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create grocery list");
    }
    return response.json();
  },

  // Delete a grocery list
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/grocery-lists/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete grocery list");
    }
  },

  // Update grocery list name
  update: async (
    id: number,
    data: UpdateGroceryListRequest
  ): Promise<GroceryList> => {
    const response = await fetch(`${API_BASE_URL}/grocery-lists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update grocery list");
    }
    return response.json();
  },
};
