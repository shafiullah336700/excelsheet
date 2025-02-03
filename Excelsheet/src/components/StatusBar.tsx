import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-[#f3f2f1] border-t border-gray-300 h-6 px-2">
      <div className="flex items-center gap-4 text-xs">
        <span>Ready</span>
        <span>Sheet1</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Minus size={12} />
          </button>
          <span className="text-xs">100%</span>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};