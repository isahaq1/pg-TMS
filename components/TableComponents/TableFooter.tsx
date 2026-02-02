import React from 'react';
import { TableFooterProps } from '@/types/table.types';
import { Button } from "../ui/button";
import {ArrowLeftDoubleIcon,ArrowRightDoubleIcon,ArrowLeft01Icon,ArrowRight01Icon } from "hugeicons-react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export function TableFooter({ 
  colSpan, 
  content,
  paginationConfig,
  onPageChange,
  onPageSizeChange 
}: TableFooterProps) {
  if (!content && !paginationConfig) {
    return null;
  }

  const totalPages = paginationConfig 
    ? Math.max(1, Math.ceil(paginationConfig.totalItems / paginationConfig.pageSize))
    : 0;

  const startItem = paginationConfig && paginationConfig.totalItems > 0
    ? (paginationConfig.currentPage - 1) * paginationConfig.pageSize + 1
    : 0;

  const endItem = paginationConfig
    ? Math.min(
        paginationConfig.currentPage * paginationConfig.pageSize,
        paginationConfig.totalItems
      )
    : 0;

  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(e.target.value));
    }
  };

  console.log('TableFooter Debug:', { 
    hasPaginationConfig: !!paginationConfig,
    totalItems: paginationConfig?.totalItems,
    pageSize: paginationConfig?.pageSize,
    currentPage: paginationConfig?.currentPage,
    totalPages 
  });

  return (
    <tfoot className="bg-white">
      {content && (
        <tr>
          <td colSpan={colSpan} className="px-4 py-2 md:px-6 md:py-4 text-sm text-gray-700">
            {content}
          </td>
        </tr>
      )}
      {paginationConfig && paginationConfig.totalItems > 0 && (
        <tr>
          <td colSpan={colSpan} className="px-4 py-2 md:px-6 md:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm leading-5 font-medium tracking-[-0.28px] text-black/55">Page Size</span>
               
                <Select
                  value={String(paginationConfig.pageSize)}
                  onValueChange={(val) => onPageSizeChange?.(Number(val))}
                >
                  <SelectTrigger className="w-20 h-[20px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                 
               
              </div>

              {/* Page info */}
              <div className="font-sans text-sm leading-5 font-medium tracking-[-0.28px] text-black/55">
                 {startItem} to {endItem} of {paginationConfig.totalItems}
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-1">
                {/* First Page Button */}
                
                
              

          <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => handlePageChange(1)}
          disabled={paginationConfig.currentPage === 1}
        >
          <ArrowLeftDoubleIcon className="h-4 w-4 text-[#737373]" />
          <span className="sr-only">First page</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => handlePageChange(paginationConfig.currentPage - 1)}
          disabled={paginationConfig.currentPage === 1}
        >
          <ArrowLeft01Icon className="h-4 w-4 text-[#737373]" />
          <span className="sr-only">Previous page</span>
        </Button>
        
        <span className="text-sm font-medium text-[rgba(0,0,0,0.55)] tracking-[-0.28px]">
          Page {paginationConfig.currentPage} of {totalPages}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => handlePageChange(paginationConfig.currentPage + 1)}
          disabled={paginationConfig.currentPage === totalPages}
        >
          <ArrowRight01Icon className="h-4 w-4 text-[#737373]" />
          <span className="sr-only">Next page</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => handlePageChange(totalPages)}
          disabled={paginationConfig.currentPage === totalPages}
        >
          <ArrowRightDoubleIcon className="h-4 w-4 text-[#737373]" />
          <span className="sr-only">Last page</span>
        </Button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </tfoot>
  );
}