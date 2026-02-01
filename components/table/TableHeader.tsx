import { ChevronDown, Filter, LayoutGrid, Search, SlidersHorizontal,Plus,Factory } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import {Add01Icon, Factory02Icon, LayoutTable01Icon, Sorting05Icon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TableHeaderProps {
  onFilterClick?: () => void;
  onSortClick?: () => void;
  onViewClick?: () => void;
  onCreateClick?: () => void;
  selectedSector?: string;
  onSectorChange?: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  createLabel?: string;
  createRoute?: string;
}

export function TableHeader({
  onFilterClick,
  onSortClick,
  onViewClick,
  onCreateClick,
  selectedSector = "all",
  onSectorChange,
  searchQuery = "",
  onSearchChange,
  createLabel = "Create",
  createRoute,
}: TableHeaderProps) {
  const CreateButton = () => {
    const buttonContent = (
      <>
        <span className="text-sm">{createLabel}</span>
        
      </>
    );

    const buttonClasses =
      "h-7 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-md px-2";

    if (createRoute) {
      return (
        <Link href={createRoute}>
          <Button className={buttonClasses}>
            {buttonContent}
          </Button>
        </Link>
      );
    }

    return (
      <Button 
        className={buttonClasses}
        onClick={onCreateClick}
      >
        {buttonContent}
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row h-auto sm:h-10 items-stretch sm:items-center justify-between w-full gap-3 sm:gap-0">
        <div className="flex items-center w-full sm:w-auto">
          <div className="p-[4px] border border-border rounded-md bg-card flex-1 sm:flex-initial">
            <Select value={selectedSector} onValueChange={onSectorChange}>
              <SelectTrigger className="h-[28px] border-0 shadow-none gap-1 px-2 text-sm font-medium text-foreground bg-transparent">
                <Factory02Icon className="h-3.5 w-3.5" />
                <SelectValue placeholder="All Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sector</SelectItem>
                <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                <SelectItem value="materials">Basic Materials</SelectItem>
                <SelectItem value="industrials">Industrials</SelectItem>
                <SelectItem value="consumer-goods">Consumer Goods</SelectItem>
                <SelectItem value="healthcare">Health Care</SelectItem>
                <SelectItem value="services">Consumer Services</SelectItem>
                <SelectItem value="telecom">Telecommunications</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="financials">Financials</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-1.5 py-1.5 w-full sm:w-auto">
          <div className="relative flex-1 min-w-0">
            <div className="relative h-8 rounded-md border border-border bg-card shadow-sm">
              <div className="flex items-center gap-1.5 h-[28px]  p-[6px] rounded-[6px] opacity-100">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Type to search..."
                  className="h-[28px] border-0 p-0 text-sm bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </div>
            </div>
          </div>
          <CreateButton />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-wrap sm:flex-nowrap h-auto sm:h-10 items-center justify-between gap-2 sm:gap-1 w-full">
        <Button
          variant="outline"
          size="sm" 
          className="h-6 rounded-sm gap-1 px-1.5 pr-2.5"
          onClick={onFilterClick}
        >
          <Add01Icon className="h-3.5 w-3.5" />
          <span className="font-sans font-normal text-[14px] leading-[20px] tracking-normal align-middle text-muted-foreground">
            Filter
          </span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center w-[67px] h-[28px] flex gap-[6px] px-[6px] py-[4px] rounded-[6px] border border-border bg-card opacity-100 shadow-sm">
          <Sorting05Icon className="h-4 w-4" />
            <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-muted-foreground">
              Sort
            </span>
          </div>
          <div className="flex items-center gap-1.5 h-7 rounded-md border border-border bg-card shadow-sm px-1.5 py-1">
            
            <LayoutTable01Icon className="h-4 w-4"/>
            <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-muted-foreground">
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}