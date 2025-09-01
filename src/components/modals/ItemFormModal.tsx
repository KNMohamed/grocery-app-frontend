import React, { useState, useEffect } from "react";
import { useCreateGroceryItem, useUpdateGroceryItem } from "../../hooks/useGroceryItems";
import type { GroceryItem } from "../../types/grocery";

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: number;
  item?: GroceryItem; // If provided, we're editing; if not, we're creating
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  listId,
  item,
}) => {
  const createItemMutation = useCreateGroceryItem();
  const updateItemMutation = useUpdateGroceryItem();
  
  // Form state
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const isEditing = !!item;
  const isLoading = createItemMutation.isPending || updateItemMutation.isPending;

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen) {
      if (item) {
        setItemName(item.name);
        setItemQuantity(item.quantity);
      } else {
        setItemName("");
        setItemQuantity(1);
      }
    }
  }, [isOpen, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || itemQuantity < 1) return;

    const data = {
      name: itemName.trim(),
      quantity: itemQuantity,
    };

    if (isEditing && item) {
      updateItemMutation.mutate(
        {
          listId,
          itemId: item.id,
          data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createItemMutation.mutate(
        {
          listId,
          data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter item name..."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="input input-bordered w-full"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              min="1"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
              className="input input-bordered w-full"
              disabled={isLoading}
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!itemName.trim() || itemQuantity < 1 || isLoading}
              className="btn btn-primary"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : isEditing ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleClose}></div>
    </div>
  );
};

export default ItemFormModal;