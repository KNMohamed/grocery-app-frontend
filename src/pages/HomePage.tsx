import React, { useState } from "react";
import NewListButton from "../components/buttons/NewListButton";
import StatCard from "../components/cards/StatCard";
import GroceryListCard from "../components/cards/GroceryListCard";
import NewListModal from "../components/modals/NewListModal";
import {
  useGroceryLists,
  useCreateGroceryList,
  useDeleteGroceryList,
} from "../hooks/useGroceryLists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faShoppingBag,
  faCheckCircle,
  faCartShopping,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

/**
 * HomePage Component - Main dashboard for managing grocery lists
 *
 * Features:
 * - Display overview statistics (total lists, items, completed items)
 * - Grid view of all grocery lists with progress indicators
 * - Create new grocery lists via modal
 * - Delete existing grocery lists
 * - Loading and error states
 */
const HomePage: React.FC = () => {
  // State to show/hide modal for creating new grocery lists
  const [showNewListModal, setShowNewListModal] = useState(false);

  // Data fetching and mutations
  const { data: groceryLists = [], isLoading, error } = useGroceryLists();
  const createListMutation = useCreateGroceryList();
  const deleteListMutation = useDeleteGroceryList();

  /**
   * Creates a new grocery list and closes the modal on success
   */
  const createNewList = async (listName: string) => {
    try {
      await createListMutation.mutateAsync({ name: listName });
      setShowNewListModal(false);
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  /**
   * Deletes a grocery list by a list ID
   */
  const deleteList = async (listId: number) => {
    try {
      await deleteListMutation.mutateAsync(listId);
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="3x"
              className="text-primary mb-4"
            />
            <p className="text-lg">Loading grocery lists...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="alert alert-error">
          <span>Failed to load grocery lists. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            <FontAwesomeIcon icon={faCartShopping} className="mr-3" />
            Manage Grocery Lists
          </h1>
        </div>
        <NewListButton
          onClick={() => setShowNewListModal(true)}
          disabled={createListMutation.isPending}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={faClipboardList}
          title="Total Lists"
          value={groceryLists.length}
          colorClass="text-primary"
        />

        <StatCard
          icon={faShoppingBag}
          title="Total Items"
          value={groceryLists.reduce(
            (total, list) => total + list.grocery_items.length,
            0
          )}
          colorClass="text-secondary"
        />

        <StatCard
          icon={faCheckCircle}
          title="Completed Items"
          value={groceryLists.reduce(
            (total, list) =>
              total +
              list.grocery_items.filter((item) => item.is_purchased).length,
            0
          )}
          colorClass="text-accent"
        />
      </div>

      {/* Grocery Lists Grid */}
      {groceryLists.length === 0 ? (
        // Empty state - no grocery lists exist yet
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold mb-2">No grocery lists yet</h3>
          <p className="text-base-content/70 mb-6">
            Create your first grocery list to get started
          </p>
          <NewListButton onClick={() => setShowNewListModal(true)} size="md" />
        </div>
      ) : (
        // Grid of grocery list cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groceryLists.map((list) => (
            <GroceryListCard
              key={list.id}
              list={list}
              onDelete={deleteList}
              isDeleting={deleteListMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Modal for creating new grocery lists */}
      <NewListModal
        isOpen={showNewListModal}
        onClose={() => setShowNewListModal(false)}
        onCreateList={createNewList}
      />
    </div>
  );
};

export default HomePage;
