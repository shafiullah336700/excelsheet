import { create } from 'zustand';
import { SpreadsheetState } from '../types/spreadsheet';

export const useSpreadsheetStore = create<SpreadsheetState>((set) => ({
  cells: {},
  activeCell: null,
  selectedRange: [],
  sheets: ['Sheet1', 'Sheet2', 'Sheet3'],
  activeSheet: 'Sheet1',
  isRibbonExpanded: true,
  setCell: (id, cell) =>
    set((state) => ({
      cells: { ...state.cells, [id]: cell },
    })),
  setActiveCell: (id) => set({ activeCell: id }),
  setSelectedRange: (range) => set({ selectedRange: range }),
  setActiveSheet: (sheet) => set({ activeSheet: sheet }),
  addSheet: () =>
    set((state) => ({
      sheets: [...state.sheets, `Sheet${state.sheets.length + 1}`],
    })),
  toggleRibbon: () =>
    set((state) => ({
      isRibbonExpanded: !state.isRibbonExpanded,
    })),
}));