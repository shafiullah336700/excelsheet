import React from 'react';

const menuItems = [
  'File',
  'Home',
  'Insert',
  'Page Layout',
  'Formulas',
  'Data',
  'Review',
  'View',
  'Automate',
  'Help',
  'Acrobat',
  'Power Pivot',
];

export const MenuTabs: React.FC = () => {
  return (
    <div className="flex items-center bg-[#f3f2f1] border-b border-gray-300 h-8">
      {menuItems.map((item) => (
        <button
          key={item}
          className="px-3 h-full text-sm hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
        >
          {item}
        </button>
      ))}
    </div>
  );
};