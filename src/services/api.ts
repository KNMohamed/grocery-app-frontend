import type {
  GroceryList,
  GroceryItem,
  CreateGroceryListRequest,
  UpdateGroceryListRequest,
  CreateGroceryItemRequest,
  UpdateGroceryItemRequest,
  GroceryListItemsResponse,
  ApiError,
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

  // Get a single grocery list
  getById: async (id: number): Promise<GroceryList> => {
    const response = await fetch(`${API_BASE_URL}/grocery-lists/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch grocery list");
    }
    return response.json();
  },
};

export const groceryItemsApi = {
  // Get all items for a grocery list
  getAll: async (listId: number): Promise<GroceryListItemsResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/grocery-lists/${listId}/items`
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle the case where grocery list doesn't exist
      if (data.error) {
        throw new Error(data.error);
      }
      throw new Error("Failed to fetch grocery items");
    }

    return data;
  },

  // Create a new grocery item
  create: async (
    listId: number,
    data: CreateGroceryItemRequest
  ): Promise<GroceryItem> => {
    const response = await fetch(
      `${API_BASE_URL}/grocery-lists/${listId}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create grocery item");
    }
    return response.json();
  },

  // Update a grocery item
  update: async (
    _listId: number,
    itemId: number,
    data: UpdateGroceryItemRequest
  ): Promise<GroceryItem> => {
    const response = await fetch(`${API_BASE_URL}/grocery-items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update grocery item");
    }
    return response.json();
  },

  // Purchase item
  purchaseItem: async (itemId: number): Promise<GroceryItem> => {
    const response = await fetch(
      `${API_BASE_URL}/grocery-items/${itemId}/purchase`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Grocery item not found");
      }
      throw new Error("Failed to purchase item");
    }
    return response.json();
  },

  // Unpurchase item
  unpurchaseItem: async (itemId: number): Promise<GroceryItem> => {
    const response = await fetch(
      `${API_BASE_URL}/grocery-items/${itemId}/unpurchase`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Grocery item not found");
      }
      throw new Error("Failed to unpurchase item");
    }
    return response.json();
  },

  // Delete a grocery item
  delete: async (itemId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/grocery-items/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete grocery item");
    }
  },
};
