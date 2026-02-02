import { ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { StatusBadge } from "./StatusBadge";
import { TableActions } from "./TableActions";
import { SectorData } from "./types";
import { useState } from "react";

interface SectorTableProps {
  data: SectorData[];
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export function SectorTable({ data, onSort, sortColumn, sortDirection }: SectorTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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
      return <ArrowUpDown className="h-4 w-4 text-[#737373] rotate-90" />;
    }
    return (
      <ArrowUpDown 
        className={`h-4 w-4 text-[#737373] rotate-90 ${sortDirection === 'desc' ? 'transform scale-y-[-1]' : ''}`} 
      />
    );
  };

  return (
    <div className="w-full rounded-md border border-[rgba(0,0,0,0.05)]">
      {/* Table Header */}
      <div className="bg-[#F6F6F8] flex h-[40px] items-center rounded-t-md">
        <div className="flex-1 flex items-center gap-3 pl-3 pr-5 py-2 border-r border-[rgba(0,0,0,0.05)]">
          <span className="flex-1 font-sans text-sm leading-5 font-medium tracking-normal text-black/55">
            Sector Name
          </span>
          <button onClick={() => onSort?.('sectorName')} className="cursor-pointer">
            <SortIcon column="sectorName" />
          </button>
        </div>

        <div className="w-[264px] flex items-center gap-3 pl-3 pr-5 py-2 border-r border-[rgba(0,0,0,0.05)]">
          <span className="flex-1 font-sans text-sm leading-5 font-medium tracking-normal text-black/55">
            Total Companies
          </span>
          <button onClick={() => onSort?.('totalCompanies')} className="cursor-pointer">
            <SortIcon column="totalCompanies" />
          </button>
        </div>

        <div className="w-[264px] flex items-center gap-3 px-3 py-2 border-r border-[rgba(0,0,0,0.05)]">
          <span className="flex-1 font-sans text-sm leading-5 font-medium tracking-normal text-black/55">
            Status
          </span>
          <button onClick={() => onSort?.('status')} className="cursor-pointer">
            <SortIcon column="status" />
          </button>
        </div>

        <div className="w-[76px] flex items-center gap-3 pl-3 pr-5 py-2">
          <span className="font-sans text-sm leading-5 font-medium tracking-normal text-black/55">
            Action
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white">
        {data.map((row, index) => (
          <div 
            key={row.id} 
            className={`flex h-[40px] items-center ${
              index !== data.length - 1 ? 'border-b border-[rgba(0,0,0,0.05)]' : ''
            }`}
          >
            <div className="flex-1 flex items-center h-[40px]  gap-2 pt-3 pr-5  pb-3 pl-3 opacity-100 border-r border-b border-l border-[#0000000D]">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 hover:bg-transparent"
                onClick={() => toggleRow(row.id)}
              >
                <ChevronDown 
                  className={`h-3.5 w-3.5 text-[#737373] transition-transform ${
                    expandedRows.has(row.id) ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </Button>
              <span className="flex-1  font-sans font-medium text-sm leading-5 tracking-normal  text-[#46474A]">
                {row.sectorName}
              </span>
            </div>

            <div className="w-[264px] flex items-center h-[40px]  gap-2 pt-3 pr-5  pb-3 pl-3 opacity-100 border-r border-b border-l border-[#0000000D]">
              <span className="font-sans font-medium text-sm leading-5 tracking-normal  text-[#46474A]">
                {row.totalCompanies}
              </span>
            </div>

            <div className="w-[264px] flex items-center h-[40px]  gap-2 pt-3 pr-5  pb-3 pl-3 opacity-100 border-r border-b border-l border-[#0000000D]">
              <StatusBadge status={row.status} />
            </div>

            <div className="w-[76px] flex items-center justify-end h-[40px]  gap-2 pt-3 pr-5  pb-3 pl-3 opacity-100 border-r border-b border-l border-[#0000000D]">
              <TableActions 
                onEdit={() => console.log('Edit', row.id)}
                onDelete={() => console.log('Delete', row.id)}
                onView={() => console.log('View', row.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
