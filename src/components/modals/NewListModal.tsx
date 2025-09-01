import React, { useState } from "react";

interface NewListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateList: (listName: string) => void;
}

const NewListModal: React.FC<NewListModalProps> = ({
  isOpen,
  onClose,
  onCreateList,
}) => {
  const [listName, setListName] = useState("");

  const handleCreate = () => {
    if (listName.trim()) {
      onCreateList(listName.trim());
      setListName("");
    }
  };

  const handleClose = () => {
    setListName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create New Grocery List</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">List Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter list name..."
            className="input input-bordered w-full"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClose}>
            Cancel
          </button>
          <button
            className={`btn btn-primary ${listName.trim() ? "text-gray-800" : ""}`}
            onClick={handleCreate}
            disabled={!listName.trim()}
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewListModal;
