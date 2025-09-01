import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  useGroceryItems,
  useDeleteGroceryItem,
  useTogglePurchaseItem,
} from "../hooks/useGroceryItems";
import ProgressBar from "../components/progress/ProgressBar";
import ItemFormModal from "../components/modals/ItemFormModal";
import type { GroceryItem } from "../types/grocery";

const GroceryListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Used to navigate back to home page
  const navigate = useNavigate();
  // List ID from params
  const listId = id ? parseInt(id, 10) : null;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GroceryItem | undefined>(
    undefined
  );

  // React Query hooks
  const {
    data,
    isLoading: loading,
    error: queryError,
  } = useGroceryItems(listId || 0);

  const deleteItemMutation = useDeleteGroceryItem(listId || 0);
  const togglePurchaseMutation = useTogglePurchaseItem(listId || 0);

  // Extract data from query result
  const items = data?.items || [];
  const listName = data?.grocery_list_name || "";
  const error = queryError?.message || null;

  // Redirect if no listId
  if (!listId) {
    navigate("/");
    return null;
  }

  const handleDeleteItem = (itemId: number) => {
    deleteItemMutation.mutate(itemId);
  };

  const handleTogglePurchase = (itemId: number, isPurchased: boolean) => {
    togglePurchaseMutation.mutate({ itemId, isPurchased });
  };

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: GroceryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(undefined);
  };

  // Calculate derived values
  const completedItems = items.filter((item) => item.is_purchased);
  const pendingItems = items.filter((item) => !item.is_purchased);
  const completionPercentage =
    items.length > 0
      ? Math.round((completedItems.length / items.length) * 100)
      : 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
        <Link to="/" className="btn btn-primary mt-4">
          Back to Lists
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="btn btn-ghost btn-sm">
          ← Back to Lists
        </Link>
      </div>
      {/* List name */}
      <div className="mb-6">
        <h2 className="text-lg">{listName}</h2>
      </div>

      {/* Progress */}
      <ProgressBar
        value={completionPercentage}
        label="Progress"
        subtitle={`${completedItems.length} of ${items.length} items completed`}
        showPercentageBelow={true}
        className="mb-8"
      />

      {/* Add Item Button */}
      <div className="mb-6 text-gray-800">
        <button
          onClick={handleAddItem}
          className="btn btn-primary text-gray-800"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-3">Shopping List</h3>
      {/* Items List */}
      <div className="space-y-4">
        {/* Pending Items */}
        {pendingItems.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-3 underline">
              Pending items
            </h3>
            <div className="space-y-2">
              {pendingItems.map((item) => (
                <div key={item.id} className="card bg-base-100 border">
                  <div className="card-body py-3 px-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={false}
                        onChange={() =>
                          handleTogglePurchase(item.id, item.is_purchased)
                        }
                      />
                      <div className="flex-1">
                        <p>{item.name}</p>
                      </div>
                      Qty:
                      <div className="badge badge-outline">{item.quantity}</div>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Edit item"
                      >
                        <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="btn btn-ghost btn-sm btn-square text-error"
                        title="Delete item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Items */}
        {completedItems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-md font-semibold mb-3 underline">
              Completed items
            </h3>
            <div className="space-y-2">
              {completedItems.map((item) => (
                <div
                  key={item.id}
                  className="card bg-base-100 border opacity-60"
                >
                  <div className="card-body py-3 px-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={true}
                        onChange={() =>
                          handleTogglePurchase(item.id, item.is_purchased)
                        }
                      />
                      <div className="flex-1">
                        <p className="line-through">{item.name}</p>
                      </div>
                      Qty:
                      <div className="badge badge-outline">{item.quantity}</div>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Edit item"
                      >
                        <FontAwesomeIcon icon={faPen} className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="btn btn-ghost btn-sm btn-square text-error"
                        title="Delete item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No items yet</h3>
            <p className="text-base-content/70">
              Add your first item to get started with your grocery list!
            </p>
          </div>
        )}
      </div>

      {/* Item Form Modal */}
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listId={listId}
        item={editingItem}
      />
    </div>
  );
};
export default GroceryListPage;
