import React from 'react';
import { TableHeaderProps, TableColumn } from '@/types/table.types';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import {UnfoldLessIcon,ArrowUp01Icon,ArrowDown01Icon } from "hugeicons-react";


export function TableHeader<T>({ columns, onSort, sortConfig }: TableHeaderProps<T>) {
  const handleSort = (column: TableColumn<T>) => {
    if (column.isSortable && onSort) {
      onSort(column.field);
    }
  };

  const getSortIcon = (field: keyof T) => {
    if (sortConfig?.field !== field) {
      return <UnfoldLessIcon size={16} className="text-[#737373]" />;
    }
    
    return sortConfig.direction === 'asc' ? (
      <ArrowUp01Icon  size={16} className="text-blue-600" />
    ) : (
      <ArrowDown01Icon size={16} className="text-blue-600" />
    );
  };

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-left md:text-center';
      case 'right':
        return 'text-left md:text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <thead className="hidden md:table-header-group w-full max-w-[1114px] h-[40px] bg-[#F6F6F8] rounded-tl-[6px] rounded-tr-[6px]">
      <tr>
        {columns.map((column, index) => (
          <th
            key={String(column.field)}
            className={`md:px-6 md:py-3 font-sans text-sm leading-5 font-medium tracking-normal  text-black/55 tracking-wider border border-[#0000000D] whitespace-nowrap ${getAlignmentClass(
              column.align
            )} ${column.width || ''}`}
          >
            {column.isSortable ? (
              <button
                onClick={() => handleSort(column)}
                className="flex items-center gap-2 hover:text-gray-900 transition-colors focus:outline-none focus:text-gray-900 w-full"
              >
                <span className='font-sans text-sm leading-5 font-medium tracking-normal text-black/55 tracking-wider whitespace-nowrap'>{column.name}</span>
                {getSortIcon(column.field)}
              </button>
            ) : (
              <span>{column.name}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
