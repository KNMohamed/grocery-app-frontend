import React from "react";

interface NewListButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const NewListButton: React.FC<NewListButtonProps> = ({
  onClick,
  size = "lg",
  className = "",
}) => {
  return (
    <button
      className={`btn btn-primary btn-${size} ${className}`}
      onClick={onClick}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      New List
    </button>
  );
};

export default NewListButton;