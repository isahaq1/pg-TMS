import React, { useState, useMemo } from 'react';
import { TableProps, SortConfig, TableColumn } from '@/types/table.types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';
import { TSearchBar } from '@/components/TableComponents/TSearchBar';
import { TableActions } from '@/components/table/TableActions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, LayoutGrid, Plus } from 'lucide-react';
import {LayoutTable01Icon, Sorting05Icon,UnfoldLessIcon } from "hugeicons-react";

export function Table<T>({
  columns,
  data,
  onSort,
  sortConfig,
  showFooter = false,
  footerContent,
  isLoading = false,
  emptyMessage,
  searchConfig,
  onSearch,
  paginationConfig,
  onPageChange,
  onPageSizeChange,
  actions,
  dropdownConfig,
  createAction,
  filterConfig,
  viewOptions,
}: TableProps<T>) {
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());

  const toggleColumn = (field: string) => {
    const newHidden = new Set(hiddenColumns);
    if (newHidden.has(field)) {
      newHidden.delete(field);
    } else {
      newHidden.add(field);
    }
    setHiddenColumns(newHidden);
  };

  const tableColumns = useMemo(() => {
    const visibleCols = columns.filter(col => !hiddenColumns.has(String(col.field)));

    if (!actions) return visibleCols;

    const actionColumn: TableColumn<T> = {
      field: 'actions' as any,
      name: '',
      align: 'right',
      width: 'w-[50px]',
      render: (_, row) => (
        <TableActions
          onView={actions.onView ? () => actions.onView!(row) : undefined}
          onEdit={actions.onEdit ? () => actions.onEdit!(row) : undefined}
          onDelete={actions.onDelete ? () => actions.onDelete!(row) : undefined}
        />
      ),
    };

    return [...visibleCols, actionColumn];
  }, [columns, actions, hiddenColumns]);

  return (
    <div className="w-full space-y-4">
      {/* Top Toolbar */}
      <div className="space-y-4">
        {/* Row 1: Dropdown, Search, Create */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Dropdown */}
          <div className="w-full md:w-auto">
            {dropdownConfig && (
              <div className="w-full md:w-[200px]">
                <Select value={dropdownConfig.value} onValueChange={dropdownConfig.onChange}>
                  <SelectTrigger className="bg-white h-[32px] w-full">
                    <div className="flex items-center gap-2">
                      {dropdownConfig.icon}
                      <SelectValue placeholder={dropdownConfig.placeholder || "Select option"} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {dropdownConfig.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Right: Search + Create */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto rounded-[6px] opacity-100">
            {/* Search */}
            {searchConfig && onSearch && (
              <div className="w-full sm:w-[250px] h-[40px]">
                <TSearchBar searchConfig={searchConfig} onSearch={onSearch} />
              </div>
            )}

            {/* Create Button */}
            {createAction && (
              <div className='h-[40px] w-full sm:w-auto'>
              <Button onClick={createAction.onClick} className="h-[28px] w-full sm:w-auto flex items-center justify-center gap-2 px-2 bg-[#2783DE] opacity-100 rounded-[6px] font-sans text-sm leading-5 font-medium tracking-normal text-[#F3F9FD]">
               {createAction.label}
                {createAction.icon || <Plus className="w-4 h-4 ml-2" />}
              </Button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Filter, Sort, View */}
        {(filterConfig || viewOptions) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left: Filter */}
            <div className="w-full sm:w-auto">
              {filterConfig?.component ? (
                filterConfig.component
              ) : filterConfig ? (
                <>
                 
                </>
              ) : null}
            </div>

            {/* Right: Sort, View */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {viewOptions?.onSortClick && (
                 <div className=" w-[67px] h-[28px]  flex items-center gap-1.5 px-[6px] py-1 bg-white opacity-100 rounded-[6px]  border border-[#0000000D]  shadow-[0_1px_3px_0_rgba(255,255,255,0.08),0_0_2px_0_rgba(255,255,255,1)]">
                  <Sorting05Icon size={16} className="text-[#0000008C]" />
                  <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-[#0000008C]">Sort</span>
                </div>
              )}
              {viewOptions?.enableColumnVisibility ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-[28px]  flex items-center gap-1.5 px-[6px] py-1 bg-white opacity-100 rounded-[6px]  border border-[#0000000D]  shadow-[0_1px_3px_0_rgba(255,255,255,0.08),0_0_2px_0_rgba(255,255,255,1)]">
                      <LayoutTable01Icon size={16} className="text-[#0000008C]" />
                      <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-[#0000008C]">View</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {columns.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={String(column.field)}
                        className="capitalize bg-white"
                        checked={!hiddenColumns.has(String(column.field))}
                        onCheckedChange={() => toggleColumn(String(column.field))}
                      >
                        {column.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : viewOptions?.onViewClick && (
                <Button variant="outline" size="sm" onClick={viewOptions.onViewClick} className="bg-white">
                  <LayoutTable01Icon className="w-4 h-4 mr-2" />
                  <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-[#0000008C]">View</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={tableColumns} onSort={onSort} sortConfig={sortConfig} />
          <TableBody
            columns={tableColumns}
            data={data}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
          {(showFooter || paginationConfig) && (
            <TableFooter 
              colSpan={tableColumns.length} 
              content={footerContent}
              paginationConfig={paginationConfig}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </table>
      </div>
    </div>
  );
}

// Hook for managing table sorting
export function useTableSort<T>(initialField?: keyof T, initialDirection: 'asc' | 'desc' = 'asc') {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    field: initialField || null,
    direction: initialField ? initialDirection : null,
  });

  const handleSort = (field: keyof T) => {
    setSortConfig((current) => {
      if (current.field === field) {
        // Toggle direction or reset
        if (current.direction === 'asc') {
          return { field, direction: 'desc' };
        } else if (current.direction === 'desc') {
          return { field: null, direction: null };
        }
      }
      return { field, direction: 'asc' };
    });
  };

  const sortData = (data: T[]): T[] => {
    if (!sortConfig.field || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.field!];
      const bValue = b[sortConfig.field!];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  };

  return { sortConfig, handleSort, sortData };
}

// Hook for managing table search
export function useTableSearch<T>(data: T[], searchableFields?: (keyof T)[]) {
  const [searchValue, setSearchValue] = useState('');

  const searchData = (dataToSearch: T[]): T[] => {
    if (!searchValue.trim()) {
      return dataToSearch;
    }

    const lowerSearchValue = searchValue.toLowerCase();

    return dataToSearch.filter((item) => {
      // If specific fields are provided, search only those
      if (searchableFields && searchableFields.length > 0) {
        return searchableFields.some((field) => {
          const value = item[field];
          return String(value).toLowerCase().includes(lowerSearchValue);
        });
      }

      // Otherwise, search all fields
      return Object.values(item as any).some((value) =>
        String(value).toLowerCase().includes(lowerSearchValue)
      );
    });
  };

  return { searchValue, setSearchValue, searchData };
}

// Hook for managing table filtering
export function useTableFilter<T>(data: T[], filterField?: keyof T) {
  const [filterValue, setFilterValue] = useState<string>('');

  const filterData = (dataToFilter: T[]): T[] => {
    if (!filterValue || !filterField) {
      return dataToFilter;
    }

    if (filterValue === 'all') {
      return dataToFilter;
    }

    return dataToFilter.filter((item) => {
      const value = item[filterField];
      return String(value) === filterValue;
    });
  };

  return { filterValue, setFilterValue, filterData };
}

// Hook for managing table pagination
export function useTablePagination(totalItems: number, initialPageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const paginateData = <T,>(data: T[]): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const paginationConfig = {
    currentPage,
    pageSize,
    totalItems,
  };

  return {
    paginationConfig,
    handlePageChange,
    handlePageSizeChange,
    paginateData,
  };
}