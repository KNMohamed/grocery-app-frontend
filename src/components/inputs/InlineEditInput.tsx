import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface InlineEditInputProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

/**
 * InlineEditInput Component - Reusable inline editing input with save/cancel actions
 *
 * Features:
 * - Auto-focus on mount
 * - Enter to save, Escape to cancel
 * - Save/cancel buttons with loading states
 * - Validation (prevents saving empty values)
 */
const InlineEditInput: React.FC<InlineEditInputProps> = ({
  initialValue,
  onSave,
  onCancel,
  isLoading = false,
  placeholder = "",
  className = "",
}) => {
  const [value, setValue] = useState(initialValue);

  // Reset value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  /**
   * Handles saving the edited value
   */
  const handleSave = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue !== initialValue) {
      onSave(trimmedValue);
    } else {
      onCancel();
    }
  };

  /**
   * Handles canceling the edit
   */
  const handleCancel = () => {
    setValue(initialValue);
    onCancel();
  };

  /**
   * Handles key press events
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className={`flex items-center gap-2 flex-1 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="input input-sm input-bordered flex-1"
        placeholder={placeholder}
        autoFocus
        disabled={isLoading}
      />
      <button
        onClick={handleSave}
        className="btn btn-ghost btn-sm btn-circle text-success"
        disabled={isLoading || !value.trim()}
      >
        <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        className="btn btn-ghost btn-sm btn-circle text-error"
        disabled={isLoading}
      >
        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InlineEditInput;