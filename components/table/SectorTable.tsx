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
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground rotate-90" />;
    }
    return (
      <ArrowUpDown 
        className={`h-4 w-4 text-muted-foreground rotate-90 ${sortDirection === 'desc' ? 'transform scale-y-[-1]' : ''}`} 
      />
    );
  };

  return (
    <>
      {/* Tablet/Desktop Table View (sm and up) */}
      <div className="hidden sm:block w-full rounded-md border border-border overflow-x-auto">
        <div className="overflow-x-auto min-w-max">
          {/* Table Header */}
          <div className="bg-muted flex h-[40px] items-center rounded-t-md">
            <div className="min-w-[180px] flex-1 flex items-center gap-3 pl-3 pr-5 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Sector name
              </span>
              <button onClick={() => onSort?.('sectorName')} className="cursor-pointer shrink-0">
                <SortIcon column="sectorName" />
              </button>
            </div>

            <div className="min-w-[140px] md:min-w-[180px] xl:min-w-[220px] flex items-center gap-3 pl-3 pr-5 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Total Companies
              </span>
              <button onClick={() => onSort?.('totalCompanies')} className="cursor-pointer shrink-0">
                <SortIcon column="totalCompanies" />
              </button>
            </div>

            <div className="min-w-[120px] md:min-w-[150px] xl:min-w-[180px] flex items-center gap-3 px-3 py-2 border-r border-border">
              <span className="flex-1 text-sm font-medium text-muted-foreground whitespace-nowrap">
                Status
              </span>
              <button onClick={() => onSort?.('status')} className="cursor-pointer shrink-0">
                <SortIcon column="status" />
              </button>
            </div>

            <div className="min-w-[70px] flex items-center justify-center gap-3 pl-3 pr-5 py-2">
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
                  index !== data.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="min-w-[180px] flex-1 flex items-center h-[40px] gap-2 pt-3 pr-5 pb-3 pl-3 border-r border-b border-l border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 hover:bg-transparent shrink-0"
                    onClick={() => toggleRow(row.id)}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        expandedRows.has(row.id) ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </Button>
                  <span className="flex-1 font-sans font-medium text-sm leading-5 tracking-normal text-foreground truncate">
                    {row.sectorName}
                  </span>
                </div>

                <div className="min-w-[140px] md:min-w-[180px] xl:min-w-[220px] flex items-center h-[40px] gap-2 pt-3 pr-5 pb-3 pl-3 border-r border-b border-l border-border">
                  <span className="font-sans font-medium text-sm leading-5 tracking-normal text-foreground">
                    {row.totalCompanies}
                  </span>
                </div>

                <div className="min-w-[120px] md:min-w-[150px] xl:min-w-[180px] flex items-center h-[40px] gap-2 pt-3 pr-5 pb-3 pl-3 border-r border-b border-l border-border">
                  <StatusBadge status={row.status} />
                </div>

                <div className="min-w-[70px] flex items-center justify-end h-[40px] gap-2 pt-3 pr-5 pb-3 pl-3 border-r border-b border-l border-border">
                  <TableActions
                    onEdit={() => console.log("Edit", row.id)}
                    onDelete={() => console.log("Delete", row.id)}
                    onView={() => console.log("View", row.id)}
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
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-transparent mt-0.5 shrink-0"
                  onClick={() => toggleRow(row.id)}
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                      expandedRows.has(row.id) ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </Button>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Sector name</div>
                  <div className="font-medium text-sm text-foreground truncate">
                    {row.sectorName}
                  </div>
                </div>
              </div>
              <TableActions
                onEdit={() => console.log("Edit", row.id)}
                onDelete={() => console.log("Delete", row.id)}
                onView={() => console.log("View", row.id)}
              />
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <StatusBadge status={row.status} />
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">Total Companies</div>
              <div className="font-medium text-sm text-foreground">{row.totalCompanies}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
