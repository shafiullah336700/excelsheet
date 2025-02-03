import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { evaluate } from 'mathjs';
import clsx from 'clsx';

const INITIAL_COLS = 50;
const INITIAL_ROWS = 100;
const LOAD_MORE_THRESHOLD = 300; // pixels before the end to trigger loading more

export const Grid: React.FC = () => {
  const { cells, activeCell, setActiveCell, setCell } = useSpreadsheetStore();
  const [visibleCols, setVisibleCols] = useState(INITIAL_COLS);
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);
  const gridRef = useRef<HTMLDivElement>(null);

  const getCellId = (row: number, col: number) => {
    const colLetter = getColumnLabel(col);
    return `${colLetter}${row + 1}`;
  };

  const getColumnLabel = (col: number) => {
    let label = '';
    while (col >= 0) {
      label = String.fromCharCode(65 + (col % 26)) + label;
      col = Math.floor(col / 26) - 1;
    }
    return label;
  };

  const handleScroll = useCallback(() => {
    if (!gridRef.current) return;

    const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = gridRef.current;

    // Check if we're near the right edge
    if (scrollWidth - (scrollLeft + clientWidth) < LOAD_MORE_THRESHOLD) {
      setVisibleCols(prev => prev + 10);
    }

    // Check if we're near the bottom
    if (scrollHeight - (scrollTop + clientHeight) < LOAD_MORE_THRESHOLD) {
      setVisibleRows(prev => prev + 20);
    }
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
      return () => gridElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleCellChange = useCallback((id: string, value: string) => {
    try {
      const computed = value.startsWith('=') 
        ? evaluate(value.substring(1)) 
        : value;
      
      setCell(id, {
        value,
        formula: value,
        computed,
      });
    } catch (e) {
      setCell(id, {
        value,
        formula: value,
      });
    }
  }, [setCell]);

  return (
    <div 
      ref={gridRef}
      className="flex-1 overflow-auto"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div className="inline-block min-w-full">
        <div className="grid" style={{ 
          gridTemplateColumns: `40px repeat(${visibleCols}, minmax(100px, 1fr))`,
        }}>
          {/* Header row */}
          <div className="sticky top-0 left-0 z-20 bg-[#f3f2f1] border-b border-r border-gray-300 h-8"></div>
          {Array.from({ length: visibleCols }).map((_, i) => (
            <div
              key={`header-${i}`}
              className="sticky top-0 z-10 bg-[#f3f2f1] border-b border-r border-gray-300 h-8 flex items-center justify-center font-semibold"
            >
              {getColumnLabel(i)}
            </div>
          ))}

          {/* Grid cells */}
          {Array.from({ length: visibleRows }).map((_, row) => (
            <React.Fragment key={`row-${row}`}>
              <div 
                className="sticky left-0 z-10 bg-[#f3f2f1] border-b border-r border-gray-300 h-8 flex items-center justify-center font-semibold"
              >
                {row + 1}
              </div>
              {Array.from({ length: visibleCols }).map((_, col) => {
                const id = getCellId(row, col);
                const cell = cells[id];
                const style = cell?.style || {};
                return (
                  <div
                    key={id}
                    className={clsx(
                      'border-b border-r border-gray-300 h-8 px-2 outline-none',
                      'focus:outline-none focus:border-blue-500',
                      activeCell === id && 'border-2 border-blue-500',
                      style.bold && 'font-bold',
                      style.italic && 'italic',
                      style.underline && 'underline',
                      {
                        'text-left': style.align === 'left',
                        'text-center': style.align === 'center',
                        'text-right': style.align === 'right',
                      }
                    )}
                    style={{
                      backgroundColor: style.backgroundColor,
                      color: style.textColor,
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    onFocus={() => setActiveCell(id)}
                    onBlur={(e) => handleCellChange(id, e.currentTarget.textContent || '')}
                  >
                    {cell?.computed || cell?.value || ''}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};