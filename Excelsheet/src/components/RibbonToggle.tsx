import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface RibbonToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const RibbonToggle: React.FC<RibbonToggleProps> = ({ isExpanded, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute right-2 bottom-0 p-1 hover:bg-gray-200 rounded"
    >
      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
};