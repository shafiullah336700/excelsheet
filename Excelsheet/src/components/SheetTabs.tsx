import React from 'react';
import { Plus } from 'lucide-react';

interface SheetTabsProps {
  sheets: string[];
  activeSheet: string;
  onSheetChange: (sheet: string) => void;
  onAddSheet: () => void;
}

export const SheetTabs: React.FC<SheetTabsProps> = ({
  sheets,
  activeSheet,
  onSheetChange,
  onAddSheet,
}) => {
  return (
    <div className="flex items-center bg-[#f3f2f1] border-t border-gray-300 h-8">
      <div className="flex-1 flex items-center">
        {sheets.map((sheet) => (
          <button
            key={sheet}
            onClick={() => onSheetChange(sheet)}
            className={`px-4 h-full text-sm border-r border-gray-300 ${
              activeSheet === sheet
                ? 'bg-white border-t-2 border-t-blue-500'
                : 'hover:bg-gray-200'
            }`}
          >
            {sheet}
          </button>
        ))}
      </div>
      <button
        onClick={onAddSheet}
        className="px-2 h-full hover:bg-gray-200"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};