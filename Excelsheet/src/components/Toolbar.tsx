import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  PaintBucket,
} from 'lucide-react';

interface ToolbarProps {
  onFormatting: (type: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onFormatting }) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-[#f3f2f1] border-b border-gray-300">
      <div className="flex items-center gap-1 border-r pr-2">
        <button
          onClick={() => onFormatting('bold')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => onFormatting('italic')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => onFormatting('underline')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Underline size={18} />
        </button>
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button
          onClick={() => onFormatting('align-left')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => onFormatting('align-center')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => onFormatting('align-right')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onFormatting('font-color')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <Type size={18} />
        </button>
        <button
          onClick={() => onFormatting('background-color')}
          className="p-1 hover:bg-gray-200 rounded"
        >
          <PaintBucket size={18} />
        </button>
      </div>
    </div>
  );
};