import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface StatCardProps {
  icon: IconDefinition;
  title: string;
  value: number;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  colorClass = "text-primary",
}) => {
  return (
    <div className="stat bg-base-200 rounded-lg">
      <div className={`stat-figure ${colorClass}`}>
        <FontAwesomeIcon icon={icon} size="xl" />
      </div>
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${colorClass}`}>{value}</div>
    </div>
  );
};

export default StatCard;
