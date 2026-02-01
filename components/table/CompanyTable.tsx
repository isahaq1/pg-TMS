import {Loading03Icon,OfficeChairIcon,ArrowUpDownIcon,ArrowLeft01Icon,DepartementIcon,UserGroup03Icon,Link04Icon,Location01Icon,Calendar04Icon,Cancel01Icon,ArrowExpand01Icon,MoreVerticalIcon} from "hugeicons-react";
import { Button } from "../ui/button";
import { StatusBadge } from "./StatusBadge";
import { TableActions } from "./TableActions";
import { CompanyData } from "./types";
import Image from "next/image";
import { useState } from "react";

interface CompanyTableProps {
  data: CompanyData[];
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export function CompanyTable({ data, onSort, sortColumn, sortDirection }: CompanyTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ArrowUpDownIcon className="h-4 w-4 text-muted-foreground rotate-90" />;
    }
    return (
      <ArrowUpDownIcon 
        className={`h-4 w-4 text-muted-foreground rotate-90 ${sortDirection === 'desc' ? 'transform scale-y-[-1]' : ''}`} 
      />
    );
  };

  return (
    <>
      {/* Tablet/Desktop Table View (sm and up) */}
      <div className="hidden sm:block w-full rounded-md border border-border overflow-x-auto">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="bg-muted flex h-[40px] items-center rounded-t-md min-w-max">
            <div className="min-w-[180px] flex-1 flex items-center gap-2 pl-3 pr-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Company name
              </span>
              <button onClick={() => onSort?.('companyName')} className="cursor-pointer shrink-0">
                <SortIcon column="companyName" />
              </button>
            </div>

            <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center gap-2 pl-3 pr-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Branches
              </span>
              <button onClick={() => onSort?.('totalBranches')} className="cursor-pointer shrink-0">
                <SortIcon column="totalBranches" />
              </button>
            </div>
            
            <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center gap-2 pl-3 pr-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Departments
              </span>
              <button onClick={() => onSort?.('totalDepartments')} className="cursor-pointer shrink-0">
                <SortIcon column="totalDepartments" />
              </button>
            </div>
            <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center gap-2 pl-3 pr-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Total Users
              </span>
              <button onClick={() => onSort?.('totalUsers')} className="cursor-pointer shrink-0">
                <SortIcon column="totalUsers" />
              </button>
            </div>

            <div className="w-[120px] md:w-[150px] xl:w-[180px] flex items-center gap-2 px-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Status
              </span>
              <button onClick={() => onSort?.('status')} className="cursor-pointer shrink-0">
                <SortIcon column="status" />
              </button>
            </div>

            <div className="w-[70px] flex items-center justify-center gap-2 pl-3 pr-3 py-2">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Action
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-card">
            {data.map((row, index) => (
              <div 
                key={row.id} 
                className={`flex h-[40px] items-center ${
                  index !== data.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="min-w-[180px] flex-1 flex items-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 hover:bg-transparent shrink-0"
                    onClick={() => toggleRow(row.id)}
                  >
                    <ArrowLeft01Icon 
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        expandedRows.has(row.id) ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </Button>
                  <span className="flex-1 font-sans font-medium text-sm leading-5 tracking-normal text-foreground truncate">
                    {row.companyName}
                  </span>
                </div>

                <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <span className="font-sans font-medium text-sm leading-5 tracking-normal text-foreground">
                    {row.totalBranches}
                  </span>
                </div>
                
                <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <span className="font-sans font-medium text-sm leading-5 tracking-normal text-foreground">
                    {row.totalDepartments}
                  </span>
                </div>
                <div className="w-[140px] md:w-[180px] xl:w-[220px] flex items-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <span className="font-sans font-medium text-sm leading-5 tracking-normal text-foreground">
                    {row.totalUsers}
                  </span>
                </div>

                <div className="w-[120px] md:w-[150px] xl:w-[180px] flex items-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <StatusBadge status={row.status} />
                </div>

                <div className="w-[70px] flex items-center justify-center h-[40px] gap-2 pt-3 pr-3 pb-3 pl-3 border-r border-b border-l border-border">
                  <TableActions 
                    onEdit={() => console.log('Edit', row.id)}
                    onDelete={() => console.log('Delete', row.id)}
                    onView={() => setSelectedCompany(row)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View (below sm) */}
      <div className="sm:hidden space-y-4">
        {data.map((row) => (
          <div 
            key={row.id} 
            className="bg-card rounded-lg border border-border p-4 space-y-3"
          >
            {/* Company Name & Expand Button */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-transparent mt-0.5"
                  onClick={() => toggleRow(row.id)}
                >
                  <ArrowLeft01Icon 
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                      expandedRows.has(row.id) ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </Button>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Company name</div>
                  <div className="font-medium text-sm text-foreground">{row.companyName}</div>
                </div>
              </div>
              <TableActions 
                onEdit={() => console.log('Edit', row.id)}
                onDelete={() => console.log('Delete', row.id)}
                onView={() => setSelectedCompany(row)}
              />
            </div>

            {/* Status */}
            <div>
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <StatusBadge status={row.status} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Branches</div>
                <div className="font-medium text-sm text-foreground">{row.totalBranches}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Departments</div>
                <div className="font-medium text-sm text-foreground">{row.totalDepartments}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Users</div>
                <div className="font-medium text-sm text-foreground">{row.totalUsers}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Panel - Top Right Corner - Pixel Perfect Match */}
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

     
    </>
  );
}