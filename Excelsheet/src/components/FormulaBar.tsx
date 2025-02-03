import React from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';

export const FormulaBar: React.FC = () => {
  const { activeCell, cells, setCell } = useSpreadsheetStore();
  
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeCell) {
      setCell(activeCell, {
        ...cells[activeCell],
        formula: e.target.value,
        value: e.target.value,
      });
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-[#f3f2f1] border-b border-gray-300">
      <div className="bg-white border border-gray-300 px-2 py-1 min-w-[60px]">
        {activeCell || ''}
      </div>
      <input
        type="text"
        className="flex-1 px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
        value={activeCell ? cells[activeCell]?.formula || '' : ''}
        onChange={handleFormulaChange}
        placeholder="Enter formula or value"
      />
    </div>
  );
};