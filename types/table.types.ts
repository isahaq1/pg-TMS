export interface TableColumn<T> {
  field: keyof T;
  name: string;
  isSortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}

export interface SortConfig<T> {
  field: keyof T | null;
  direction: 'asc' | 'desc' | null;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface SearchConfig {
  value: string;
  placeholder?: string;
  searchableFields?: string[];
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onSort?: (field: keyof T) => void;
  sortConfig?: SortConfig<T>;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  // Search props
  searchConfig?: SearchConfig;
  onSearch?: (value: string) => void;
  // Pagination props
  paginationConfig?: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  actions?: TableActionsConfig<T>;
  // Header controls
  dropdownConfig?: {
    placeholder?: string;
    options: Array<{ label: string; value: string }>;
    value?: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
  };
  createAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  filterConfig?: {
    onClick?: () => void;
    label?: string;
    component?: React.ReactNode;
  };
  viewOptions?: {
    onSortClick?: () => void;
    onViewClick?: () => void;
    enableColumnVisibility?: boolean;
  };
}

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  onSort?: (field: keyof T) => void;
  sortConfig?: SortConfig<T>;
}

export interface TableBodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export interface TableFooterProps {
  colSpan: number;
  content?: React.ReactNode;
  paginationConfig?: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface TableActionsConfig<T> {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    className?: string;
  }>;
}