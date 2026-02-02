import React from 'react';
import { TableBodyProps } from '@/types/table.types';

export function TableBody<T>({ columns, data, isLoading, emptyMessage }: TableBodyProps<T>) {
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

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="px-6 py-12 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="px-4 py-8 md:px-6 md:py-12 text-center text-gray-500">
            {emptyMessage || 'No data available'}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="md:table-row block hover:bg-gray-50 transition-colors">
          {columns.map((column) => {
            const value = row[column.field];
            const cellContent = column.render ? column.render(value, row) : String(value);

            return (
              <td
                key={String(column.field)}
                className={`block h-[40px] md:table-cell border border-[#0000000D] px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900 ${getAlignmentClass(column.align)}`}
              >
                <div className="md:hidden font-sans text-sm leading-5 font-medium tracking-normal text-[#46474A]">{String(column.name)}</div>
                <div className="font-sans text-sm leading-5 font-medium tracking-normal text-[#46474A]">{cellContent}</div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
