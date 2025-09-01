import React from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className = "",
  label = "Progress",
}) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <progress
        className="progress progress-primary w-full"
        value={percentage}
        max="100"
      ></progress>
    </div>
  );
};

export default ProgressBar;
