export type SectorStatus = 'active' | 'inactive';
export type CompnayStatus = 'active' | 'inactive';

export interface SectorData {
  id: string;
  sectorName: string;
  totalCompanies: number;
  status: SectorStatus;
}

export interface CompanyData {
  id: string;
  companyName: string;
  totalBranches: number;
  totalDepartments: number;
  totalUsers: number;
  address: string;
  status: CompnayStatus;
}
