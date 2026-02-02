import { ChevronDown, Filter, LayoutGrid, Search, SlidersHorizontal,Plus,Factory } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import {Add01Icon, Factory02Icon, LayoutTable01Icon, Sorting05Icon,UnfoldLessIcon } from "hugeicons-react";
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

    const buttonClasses = "h-7 bg-[#2783de] hover:bg-[#2783de]/90 text-[#f3f9fd] gap-2 rounded-md px-2";

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
      <div className="flex h-10 items-center justify-between w-full">
        <div className="flex items-center">
          <div className="p-[4px] border border-[rgba(0,0,0,0.05)] rounded-md">
            <Select value={selectedSector} onValueChange={onSectorChange}>
              <SelectTrigger className="h-[28px] border-0 shadow-none gap-1 px-2 text-sm font-medium text-[#242529]">
                <Factory02Icon size={14} />
                <SelectValue placeholder="All Sector"  className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-[#242529] "/>
              </SelectTrigger>
              <SelectContent className="font-sans text-sm leading-5 font-medium tracking-normal align-middle text-[#242529] ">
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

        <div className="flex items-center gap-2 pl-1.5 py-1.5">
          <div className="relative flex-1 ">
            <div className="relative h-8 bg-white rounded-md border border-[rgba(0,0,0,0.05)] shadow-[0px_0px_2px_0px_white,0px_1px_3px_0px_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-1.5 h-[28px]  p-[6px] rounded-[6px] opacity-100">
                <Search className="h-3.5 w-3.5 text-[#A2A4A7]" />
                <Input
                  type="text"
                  placeholder="Type to search..."
                  className="h-[28px] border-0 p-0 text-sm placeholder:text-[rgba(0,0,0,0.4)] focus-visible:ring-0 shadow-none"
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
      <div className="flex h-10 items-center justify-between gap-1 w-full">
        <Button 
          variant="filter" 
          size="sm" 
          className="h-6 rounded-sm gap-1 px-1.5 pr-2.5"
          onClick={onFilterClick}
        >
          <Add01Icon className="h-3.5 w-3.5" />
          <span className="font-sans font-normal  text-[14px] leading-[20px] tracking-normal align-middle text-[#0000008C]">Filter</span>
        </Button>

        <div className="flex items-center gap-2">
          <div className=" w-[67px] h-[28px]  flex items-center gap-1.5 px-[6px] py-1 bg-white opacity-100 rounded-[6px]  border border-[#0000000D]  shadow-[0_1px_3px_0_rgba(255,255,255,0.08),0_0_2px_0_rgba(255,255,255,1)]">
          <Sorting05Icon size={16} className="text-[#0000008C]" />
            <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-[#0000008C]">Sort</span>
          </div>
          <div className="h-[28px]  flex items-center gap-1.5 px-[6px] py-1 bg-white opacity-100 rounded-[6px]  border border-[#0000000D]  shadow-[0_1px_3px_0_rgba(255,255,255,0.08),0_0_2px_0_rgba(255,255,255,1)]">
            
            <LayoutTable01Icon size={16} className="text-[#0000008C]"/>
            <span className="font-inter font-normal text-[12px] leading-[24px] tracking-normal text-[#0000008C]">View</span>
          </div>
        </div>
      </div>
    </div>
  );
}