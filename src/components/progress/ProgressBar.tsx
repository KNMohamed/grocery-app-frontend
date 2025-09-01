import React from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
  subtitle?: string;
  showPercentageBelow?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className = "",
  label = "Progress",
  subtitle,
  showPercentageBelow = false,
}) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{label}</span>
        {subtitle ? (
          <span className="text-base-content/70">{subtitle}</span>
        ) : (
          <span>{percentage}%</span>
        )}
      </div>
      <progress
        className="progress progress-primary w-full"
        value={percentage}
        max="100"
      ></progress>
      {showPercentageBelow && (
        <div className="text-center mt-1 text-sm text-base-content/70">
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
