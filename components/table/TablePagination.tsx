import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import {ArrowLeftDoubleIcon,ArrowRightDoubleIcon,ArrowLeft01Icon,ArrowRight01Icon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full py-3 border-t border-border gap-3 sm:gap-0">
      <div className="flex items-center gap-1 w-full sm:w-[350.6667px]">
        <span className="font-sans w-[64px] font-medium text-[14px] leading-[20px] tracking-[-0.28px] text-muted-foreground">
          Page Size
        </span>
        <Select 
          value={pageSize.toString()} 
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-7 w-[100px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-sans font-medium text-[14px] leading-[20px] tracking-[-0.28px] text-muted-foreground">
          {startItem} to {endItem} of {totalItems}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 font-sans font-medium text-[14px] leading-[20px] tracking-[-0.28px] text-muted-foreground">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftDoubleIcon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">First page</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft01Icon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Previous page</span>
        </Button>
        
        <span className="text-sm font-medium text-muted-foreground tracking-[-0.28px]">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight01Icon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Next page</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ArrowRightDoubleIcon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
}
