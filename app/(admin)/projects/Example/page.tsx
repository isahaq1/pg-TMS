'use client';

import React, { useState } from 'react';
import { Table, useTableSort, useTableSearch, useTablePagination, useTableFilter } from '@/components/TableComponents/Table';
import { TableColumn } from '@/types/table.types';
import { mockCompanyData } from '@/lib/company-mock-data';
import { Building2, ChevronDown, Plus, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Company {
  id: number;
  companyName: string;
  totalBranches: number;
  totalDepartments: number;
  address: string;
  status: 'active' | 'inactive';
  totalUsers: number;
}

// Sample data - expanded for pagination demo
const companies: Company[] = mockCompanyData.map((item) => ({
  id: item.id,
  companyName: item.companyName,
  totalBranches: item.totalBranches,
  totalDepartments: item.totalDepartments,
  status: item.status,
  totalUsers: item.totalUsers,
  address: item.address,
}));

export default function ProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Sorting
  const { sortConfig, handleSort, sortData } = useTableSort<Company>('companyName', 'asc');
  
  // Searching
  const { searchValue, setSearchValue, searchData } = useTableSearch<Company>(
    companies,
    ['companyName', 'totalBranches']
  );

  // Pagination hook needs to be initialized first to get the handler
  // We'll calculate data first, then initialize pagination
  
  // Apply Search -> Filter -> Sort
  const searchedData = searchData(companies);
  
  // Custom filter logic to match dropdown (Role) and Filter Button (Status)
  const filteredData = searchedData.filter(company => {
    const matchesRole = !selectedStatus || selectedStatus === 'all';
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    return matchesRole && matchesStatus;
  });

  const sortedData = sortData(filteredData);

  const { paginationConfig, handlePageChange, handlePageSizeChange, paginateData } = 
    useTablePagination(sortedData.length, 5); // Start with 5 items per page

  const paginatedData = paginateData(sortedData);

  // Handlers that reset pagination
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    handlePageChange(1);
  };

  const handleRoleChange = (value: string) => {
    setSelectedStatus(value);
    handlePageChange(1);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status === statusFilter ? 'all' : status);
    handlePageChange(1);
  };

  const columns: TableColumn<Company>[] = [
    {
      field: 'id',
      name: 'ID',
      isSortable: true,
      width: 'w-20',
      align: 'center',
    },
    {
      field: 'companyName',
      name: 'Company Name',
      isSortable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      field: 'totalBranches',
      name: 'Total Branch',
      isSortable: true,
    },
    {
      field: 'totalDepartments',
      name: 'Total Departments',
      isSortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value === 'Admin' ? 'bg-purple-100 text-purple-800' :
          value === 'Manager' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      field: 'status',
      name: 'Status',
      isSortable: true,
      align: 'center',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      field: 'totalUsers',
      name: 'Total Users',
      isSortable: true,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  const handleView = (company: Company) => {
    console.log('View user:', company);
  };

  const handleEdit = (company: Company) => {
    console.log('Edit user:', company);
  };

  const handleDelete = (company: Company) => {
    console.log('Delete user:', company);
  };

  // Status Filter Component
  const FilterComponent = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white">
          <Filter className="w-4 h-4 mr-2" />
          Filter Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={statusFilter === 'active'}
          onCheckedChange={() => handleStatusFilterChange('active')}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statusFilter === 'inactive'}
          onCheckedChange={() => handleStatusFilterChange('inactive')}
        >
          Inactive
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={statusFilter === 'all'}
          onCheckedChange={() => handleStatusFilterChange('all')}
        >
          All Statuses
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="p-6 space-y-6">
    

      <Table
        columns={columns}
        data={paginatedData}
        onSort={handleSort}
        sortConfig={sortConfig}
        searchConfig={{
          value: searchValue,
          placeholder: 'Type to search...',
          searchableFields: ['companyName'],
        }}
        onSearch={handleSearchChange}
        paginationConfig={paginationConfig}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
        dropdownConfig={{
          placeholder: "All Roles",
          options: [
            { label: "All Roles", value: "all" },
            { label: "Admin", value: "Admin" },
            { label: "Manager", value: "Manager" },
            { label: "User", value: "User" },
          ],
          value: selectedStatus,
          onChange: handleRoleChange,
          icon: <Building2 className="w-4 h-4 text-gray-500" />
        }}
        createAction={{
          label: "Create",
          onClick: () => console.log("Create new company clicked"),
          icon: <ChevronDown className="w-4 h-4 ml-2" />
        }}
        filterConfig={{
          component: FilterComponent
        }}
        viewOptions={{
          enableColumnVisibility: true,
          onSortClick: () => console.log("Sort clicked"),
        }}
      />
    </div>
  );
}
