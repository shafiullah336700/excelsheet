import React from 'react';
import { 
  Copy, 
  Scissors, 
  ClipboardPaste,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  PaintBucket
} from 'lucide-react';

interface SegmentsProps {
  onFormatting: (type: string) => void;
}

export const Segments: React.FC<SegmentsProps> = ({ onFormatting }) => {
  return (
    <div className="flex gap-4 p-2 bg-[#f3f2f1] border-b border-gray-300">
      <div className="flex flex-col items-center gap-1 px-3 border-r border-gray-300">
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Copy size={16} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Scissors size={16} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <ClipboardPaste size={16} />
          </button>
        </div>
        <span className="text-xs">Clipboard</span>
      </div>

      <div className="flex flex-col items-center gap-1 px-3 border-r border-gray-300">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onFormatting('bold')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => onFormatting('italic')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => onFormatting('underline')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Underline size={16} />
          </button>
        </div>
        <span className="text-xs">Font</span>
      </div>

      <div className="flex flex-col items-center gap-1 px-3 border-r border-gray-300">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onFormatting('align-left')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => onFormatting('align-center')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => onFormatting('align-right')}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <AlignRight size={16} />
          </button>
        </div>
        <span className="text-xs">Alignment</span>
      </div>
    </div>
  );
};