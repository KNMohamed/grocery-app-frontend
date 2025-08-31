export interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
  is_purchased: boolean;
  purchased_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GroceryList {
  id: number;
  name: string;
  grocery_items: GroceryItem[];
  created_at: string;
  updated_at: string;
}

// Request types
export interface CreateGroceryListRequest {
  name: string;
}

export interface UpdateGroceryListRequest {
  name: string;
}

export interface CreateGroceryItemRequest {
  name: string;
  quantity: number;
}

export interface UpdateGroceryItemRequest {
  name?: string;
  quantity?: number;
}

// Response types
export interface ApiError {
  error: string;
}

export interface DeleteGroceryItemResponse {
  message: string;
}
