import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPen } from "@fortawesome/free-solid-svg-icons";
import type { GroceryList } from "../../types/grocery";
import ProgressBar from "../progress/ProgressBar";
import InlineEditInput from "../inputs/InlineEditInput";

interface GroceryListCardProps {
  list: GroceryList;
  onDelete: (listId: number) => void;
  onUpdate: (listId: number, name: string) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

/**
 * GroceryListCard Component - Individual card for displaying grocery list information
 *
 * Features:
 * - Display list name and progress
 * - Show item statistics (total, purchased, not purchased)
 * - Delete functionality with loading state
 * - Update functionality with loading state
 * - View list action button
 */
const GroceryListCard: React.FC<GroceryListCardProps> = ({
  list,
  onDelete,
  onUpdate,
  isDeleting = false,
  isUpdating = false,
}) => {
  // State to show inline editing
  const [isEditing, setIsEditing] = useState(false);
  /**
   * Calculates the completion percentage for the grocery list
   * @returns Progress percentage (0-100)
   */
  const getListProgress = () => {
    if (list.grocery_items.length === 0) return 0;
    const completedItems = list.grocery_items.filter(
      (item) => item.is_purchased
    ).length;
    return Math.round((completedItems / list.grocery_items.length) * 100);
  };

  /**
   * Handles starting the edit mode
   */
  const handleStartEdit = () => {
    setIsEditing(true);
  };

  /**
   * Handles saving the edited name
   */
  const handleSaveEdit = (newName: string) => {
    onUpdate(list.id, newName);
    setIsEditing(false);
  };

  /**
   * Handles canceling the edit
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
      <div className="card-body">
        {/* Card header with title and actions menu */}
        <div className="flex justify-between items-start mb-4">
          {isEditing ? (
            <InlineEditInput
              initialValue={list.name}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isLoading={isUpdating}
              placeholder="Enter list name"
            />
          ) : (
            <>
              <h2 className="card-title text-lg">{list.name}</h2>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="w-5 h-5"
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-right"
                >
                  <li>
                    <a onClick={handleStartEdit}>
                      <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                      {isUpdating ? "Updating..." : "Edit"}
                    </a>
                  </li>
                  <li>
                    <a className="text-error" onClick={() => onDelete(list.id)}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Progress bar showing completion percentage */}
        <ProgressBar value={getListProgress()} />

        {/* Item statistics */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Items:</span>
            <span className="font-medium">{list.grocery_items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Purchased:</span>
            <span className="font-medium text-success">
              {list.grocery_items.filter((item) => item.is_purchased).length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/70">Not Purchased:</span>
            <span className="font-medium text-warning">
              {list.grocery_items.filter((item) => !item.is_purchased).length}
            </span>
          </div>
        </div>

        {/* Card actions */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm text-gray-800">
            View List
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryListCard;
