// Common types for the application

export type UserRole = 'admin' | 'contractor' | 'subcontractor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type Specialty = 'TPO Roofer w/ Materials' | 'TPO Roofer Repair' | 'TPO Roofer Labor' | 'Shinglers w/ Materials' | 'Shinglers repair' | 'Shinglers Labor' | 'Metal Roofing w/ Materials' | 'Metal Roofing Labor' | 'Metal Roofing Repair' |  'Clay Tile w/ Materials' | 'Clay Tile Repair' | 'Clay Tile Labor' | 'Gutter Installer w/ Materials' |  'Gutter Installer w/ Seamless' | 'Gutter Installer Labor' | 'Gutter Repair';

export interface Subcontractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  zipCodes: string[];
  specialties: Specialty[];
  availability: 'Available' | 'Booked';
  licenseStatus: 'Valid' | 'Expired' | 'Pending';
}

export interface Job {
  id: string;
  clientName: string;
  location: string;
  zipCode: string;
  jobType: string;
  status: 'Open' | 'Assigned' | 'Completed';
  subcontractorId?: string;
  quoteAmount?: number;
  inspectorId?: string;
}

export interface Advertisement {
  id: string;
  businessName: string;
  imageUrl: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  clicks: number;
}
