import React from 'react';

const CategoryBox = ({ title, categories = [], selected, onChange, className = '' }) => {
  return (
    <div className={`flex flex-col border border-[#E5E7EB] py-3 pl-4 ${className}`}>
      <span className="mb-3 text-sm">{title}</span>

      {categories.map((category, index) => (
        <label key={index} className="flex items-center gap-2 mb-1">
          <input type="checkbox" className="accent-blue-500 hover:cursor-pointer" checked={selected.includes(category)} onChange={() => onChange(category)} />
          <span className="text-[#374151] text-sm">{category}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryBox;
