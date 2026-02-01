"use client";
import { useState, useMemo } from 'react';
import { TableHeader } from '@/components/table/TableHeader';
import { CompanyTable } from '@/components/table/CompanyTable';
import { TablePagination } from '@/components/table/TablePagination';
import { mockCompanyData } from '@/lib/company-mock-data';
import { CompanyData } from '@/components/table/types';
import Loader from '@/components/common/loading-screen';

export default function CompanyList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return mockCompanyData.filter((item) => {
      const matchesSearch = item.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue = a[sortColumn as keyof CompanyData];
      let bValue = b[sortColumn as keyof CompanyData];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-[60vh] w-full overflow-x-hidden">
      <div className="w-full p-4 sm:p-5 md:p-6 max-w-full">
        <div className="flex flex-col gap-2">
          <TableHeader
            selectedSector={selectedSector}
            onSectorChange={setSelectedSector}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => console.log('Filter clicked')}
            onSortClick={() => console.log('Sort clicked')}
            onViewClick={() => console.log('View clicked')}
            createLabel="Create Company"
            createRoute="/companies/create"
          />

          {isLoading ? (
         <Loader/>
          ) : (
            <>
              <CompanyTable
                data={paginatedData}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />

              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={sortedData.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}