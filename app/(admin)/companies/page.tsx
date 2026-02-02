'use client';

import React, { useState } from 'react';
import { Table, useTableSort, useTableSearch, useTablePagination, useTableFilter } from '@/components/TableComponents/Table';
import { TableColumn } from '@/types/table.types';
import { mockCompanyData } from '@/lib/company-mock-data';
import Image from "next/image";

import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/table/StatusBadge";
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
import {Add01Icon, Factory02Icon, Loading03Icon,OfficeChairIcon,ArrowUpDownIcon,ArrowLeft01Icon,DepartementIcon,UserGroup03Icon,Link04Icon,Location01Icon,Calendar04Icon,Cancel01Icon,ArrowExpand01Icon,MoreVerticalIcon,UnfoldLessIcon } from "hugeicons-react";


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

  id: Number(item.id),
  companyName: item.companyName,
  totalBranches: item.totalBranches,
  totalDepartments: item.totalDepartments,
  status: item.status,
  totalUsers: item.totalUsers,
  address: item.address,
}));

export default function CompantList() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
   const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const router = useRouter(); 
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
    },
    {
      field: 'totalUsers',
      name: 'Total Users'},
    {
      field: 'address',
      name: 'Address',},
    {
      field: 'status',
      name: 'Status',
      isSortable: true,
      align: 'center',
      render: (value) => (
        <StatusBadge status={value} />
      ),
    },
  ];

  const handleView = (company: Company) => {
      setSelectedCompany(company);
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
        <Button variant="outline"  className="w-[66px] h-[24px]
  flex items-center gap-1 pl-[5px] pr-[9px]  bg-[#F6F6F8]  opacity-100  rounded-[3px]">
          <Add01Icon size={14} />
         <span className="font-inter text-sm leading-5 font-normal tracking-normal align-middle text-black/55"> Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-white">
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
    <div className="flex min-h-[60vh] w-full p-[8px]">
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
          placeholder: "All Companies",
          options: [
            { label: "All Companies", value: "all" },
            { label: "Jessore Feed Mill Ltd", value: "Jessore Feed Mill Ltd" },
            { label: "Tea Garden", value: "Tea Garden" },
          ],
          value: selectedStatus,
          onChange: handleRoleChange,
          icon: <Factory02Icon className="w-4 h-4 text-gray-500" />
        }}
        createAction={{
          label: "Create",
          onClick: () => router.push('/companies/create'),
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

      {selectedCompany && (
        <div className="fixed top-2 right-0 w-[568px]  h-[1008px] opacity-100 rounded-lg border-[0.5px] border-[#0000000D]   flex flex-col gap-2.5 p-5 bg-[#FFFFFF] shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]  z-50 animate-slide-in overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0  z-10 px-6 py-4 flex items-center justify-between ">
            <button
              onClick={() => setSelectedCompany(null)}
              className="p-2 hover:bg-muted rounded-lg transition-colors -ml-2"
            >
              <Cancel01Icon className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowExpand01Icon className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <MoreVerticalIcon className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Company Header */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 flex gap-5 opacity-100">
                <Image src="/branchlogo.png" alt="Jessore" width={24} height={24} className="w-6 h-6 opacity-100 rounded-full border-[0.5px] border-[#0000000D]"/>
                </div>
                <h1 className="flex items-center font-sans font-semibold text-base leading-6 tracking-normal align-middle text-[#242529]">
                  {selectedCompany.companyName}
                </h1>
              </div>
              <div className="opacity-100 py-[2px] px-1">
              <p className="font-inter text-sm leading-5 font-normal tracking-normal align-middle text-black/55">
                {selectedCompany.companyName} is a key Paragon Group company, providing reliable, high quality feed products that support farm growth and performance.
              </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <Loading03Icon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Status</span>
                </div>
                <div>
                  <StatusBadge status={selectedCompany.status} />
                </div>
              </div>

             

              {/* Total branches */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <OfficeChairIcon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Total branches</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">
                  {selectedCompany.totalBranches}
                </span>
              </div>

              {/* Total Department */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <DepartementIcon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Total Department</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">
                  {selectedCompany.totalDepartments}
                </span>
              </div>

              {/* Total users */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <UserGroup03Icon className="w-[14px] h-[14px]" />
                  <span className="text-[15px]">Total users</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">{selectedCompany.totalUsers}</span>
              </div>

              

              {/* Website URL */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <Link04Icon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Website URL</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">www.paragongroup-bd.com</span>
              </div>

              {/* Company Address */}
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px] pt-0.5">
                  <Location01Icon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Company Address</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">
                {selectedCompany.address}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <Calendar04Icon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Created Date</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">11/11/2025</span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <Calendar04Icon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Last Updated</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">11/11/2025</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
