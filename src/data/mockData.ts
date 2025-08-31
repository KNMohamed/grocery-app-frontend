import type { GroceryList } from "../types/grocery";

export const mockGroceryLists: GroceryList[] = [
  {
    id: 1,
    name: "Weekly Shopping",
    grocery_items: [
      {
        id: 1,
        name: "Milk",
        quantity: 1,
        is_purchased: false,
        purchased_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Bread",
        quantity: 2,
        is_purchased: true,
        purchased_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Apples",
        quantity: 6,
        is_purchased: false,
        purchased_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];