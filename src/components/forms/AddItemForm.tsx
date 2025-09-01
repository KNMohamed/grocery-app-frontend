import React, { useState } from "react";
import { useCreateGroceryItem } from "../../hooks/useGroceryItems";

interface AddItemFormProps {
  listId: number;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ listId }) => {
  const createItemMutation = useCreateGroceryItem();
  
  // Form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemQuantity < 1) return;

    createItemMutation.mutate(
      {
        listId,
        data: {
          name: newItemName.trim(),
          quantity: newItemQuantity,
        },
      },
      {
        onSuccess: () => {
          // Reset form on success
          setNewItemName("");
          setNewItemQuantity(1);
        },
      }
    );
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleAddItem} className="card bg-base-100 border">
        <div className="card-body py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add new item..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="input input-bordered w-full"
                disabled={createItemMutation.isPending}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Qty:</label>
              <input
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={(e) =>
                  setNewItemQuantity(parseInt(e.target.value) || 1)
                }
                className="input input-bordered w-20"
                disabled={createItemMutation.isPending}
              />
            </div>
            <button
              type="submit"
              disabled={
                !newItemName.trim() ||
                newItemQuantity < 1 ||
                createItemMutation.isPending
              }
              className="btn btn-primary"
            >
              {createItemMutation.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;