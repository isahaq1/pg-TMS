import React from 'react';
import { Search, X } from 'lucide-react';
import { SearchConfig } from '@/types/table.types';
import {Search01Icon, Sorting05Icon,UnfoldLessIcon } from "hugeicons-react";

interface SearchBarProps {
  searchConfig: SearchConfig;
  onSearch: (value: string) => void;
}

export function TSearchBar({ searchConfig, onSearch }: SearchBarProps) {
  const handleClear = () => {
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md h-[28px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search01Icon size={14} className='text-black/40 '/>
      </div>
      <input
        type="text"
        value={searchConfig.value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={searchConfig.placeholder || 'Search...'}
        className="block w-full text-black/40  h-[28px] pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm leading-5 font-normal tracking-normal"
      />
      {searchConfig.value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}