export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string | number;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
