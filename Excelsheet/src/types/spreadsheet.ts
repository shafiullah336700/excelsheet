export interface Cell {
  value: string;
  formula: string;
  computed?: number | string;
  style?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    align?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    textColor?: string;
  };
}

export interface SpreadsheetState {
  cells: { [key: string]: Cell };
  activeCell: string | null;
  selectedRange: string[];
  sheets: string[];
  activeSheet: string;
  isRibbonExpanded: boolean;
  setCell: (id: string, cell: Cell) => void;
  setActiveCell: (id: string | null) => void;
  setSelectedRange: (range: string[]) => void;
  setActiveSheet: (sheet: string) => void;
  addSheet: () => void;
  toggleRibbon: () => void;
}