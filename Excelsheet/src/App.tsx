import React from 'react';
import { ProgramFrame } from './components/ProgramFrame';
import { MenuTabs } from './components/MenuTabs';
import { RibbonToggle } from './components/RibbonToggle';
import { Segments } from './components/Segments';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';
import { SheetTabs } from './components/SheetTabs';
import { StatusBar } from './components/StatusBar';
import { useSpreadsheetStore } from './store/spreadsheetStore';

function App() {
  const {
    activeCell,
    cells,
    sheets,
    activeSheet,
    isRibbonExpanded,
    setCell,
    setActiveSheet,
    addSheet,
    toggleRibbon,
  } = useSpreadsheetStore();

  const handleFormatting = (type: string) => {
    if (!activeCell || !cells[activeCell]) return;

    const cell = cells[activeCell];
    const style = cell.style || {};

    switch (type) {
      case 'bold':
        setCell(activeCell, {
          ...cell,
          style: { ...style, bold: !style.bold },
        });
        break;
      case 'italic':
        setCell(activeCell, {
          ...cell,
          style: { ...style, italic: !style.italic },
        });
        break;
      case 'underline':
        setCell(activeCell, {
          ...cell,
          style: { ...style, underline: !style.underline },
        });
        break;
      // Add more formatting options as needed
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ProgramFrame />
      <MenuTabs />
      <div className="relative">
        {isRibbonExpanded && <Segments onFormatting={handleFormatting} />}
        <RibbonToggle isExpanded={isRibbonExpanded} onToggle={toggleRibbon} />
      </div>
      <FormulaBar />
      <div className="flex-1 overflow-hidden">
        <Grid />
      </div>
      <SheetTabs
        sheets={sheets}
        activeSheet={activeSheet}
        onSheetChange={setActiveSheet}
        onAddSheet={addSheet}
      />
      <StatusBar />
    </div>
  );
}

export default App;