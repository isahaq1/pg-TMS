'use client';

import React, { useState } from 'react';
import { Table, useTableSort, useTableSearch, useTablePagination, useTableFilter } from '@/components/TableComponents/Table';
import { TableColumn } from '@/types/table.types';
import { mockSectorData } from '@/lib/mock-data';
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


interface Sector {
  id: number;
  sectorName: string;
  totalCompanies: number;
  status: 'active' | 'inactive';
}

// Sample data - expanded for pagination demo
const sectors: Sector[] = mockSectorData.map((item) => ({

  id: Number(item.id),
  sectorName: item.sectorName,
  totalCompanies: item.totalCompanies,
  status: item.status,
}));

export default function SectorList() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
   const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const router = useRouter(); 
  // Sorting
  const { sortConfig, handleSort, sortData } = useTableSort<Sector>('sectorName', 'asc');
  
  // Searching
  const { searchValue, setSearchValue, searchData } = useTableSearch<Sector>(
    sectors,
    ['sectorName']
  );

  // Pagination hook needs to be initialized first to get the handler
  // We'll calculate data first, then initialize pagination
  
  // Apply Search -> Filter -> Sort
  const searchedData = searchData(sectors);
  
  // Custom filter logic to match dropdown (Role) and Filter Button (Status)
  const filteredData = searchedData.filter(sector => {
    const matchesRole = !selectedStatus || selectedStatus === 'all';
    const matchesStatus = statusFilter === 'all' || sector.status === statusFilter;
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

  const columns: TableColumn<Sector>[] = [
    {
      field: 'id',
      name: 'ID',
      width: 'w-20',
      align: 'center',
    },
    {
      field: 'sectorName',
      name: 'Sector Name',
      isSortable: true,
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      field: 'totalCompanies',
      name: 'Total Company'
    },
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

  const handleView = (sector: Sector) => {
      setSelectedSector(sector);
  };

  const handleEdit = (sector: Sector) => {
    console.log('Edit sector:', sector);
  };

  const handleDelete = (sector: Sector) => {
    console.log('Delete sector:', sector);
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
          searchableFields: ['sectorName'],
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
          placeholder: "All Sectos",
          options: [
            { label: "All Sectors", value: "all" },
            { label: "Poultry", value: "Poultry" },
            { label: "Feed", value: "Feed" },
          ],
          value: selectedStatus,
          onChange: handleRoleChange,
          icon: <Factory02Icon className="w-4 h-4 text-gray-500" />
        }}
        createAction={{
          label: "Create",
          onClick: () => router.push('/sectors/create'),
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

      {selectedSector && (
        <div className="fixed top-2 right-0 w-[568px]  h-[1008px] opacity-100 rounded-lg border-[0.5px] border-[#0000000D]   flex flex-col gap-2.5 p-5 bg-[#FFFFFF] shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]  z-50 animate-slide-in overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0  z-10 px-6 py-4 flex items-center justify-between ">
            <button
              onClick={() => setSelectedSector(null)}
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
                  {selectedSector.sectorName}
                </h1>
              </div>
              <div className="opacity-100 py-[2px] px-1">
              <p className="font-inter text-sm leading-5 font-normal tracking-normal align-middle text-black/55">
                {selectedSector.sectorName} is a key Paragon Group company, providing reliable, high quality feed products that support farm growth and performance.
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
                  <StatusBadge status={selectedSector.status} />
                </div>
              </div>

             

              {/* Total branches */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-muted-foreground min-w-[180px]">
                  <OfficeChairIcon className="w-[14px] h-[14px]" />
                  <span className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-black/55">Total branches</span>
                </div>
                <span className="font-sans text-sm leading-5 font-normal tracking-normal align-middle text-[#46474A]">
                  {selectedSector.totalCompanies}
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
