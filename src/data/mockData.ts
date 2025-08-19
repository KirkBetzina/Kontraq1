import { Job, Subcontractor, Advertisement, User, Specialty } from '@/types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'John Contractor',
    email: 'john@example.com',
    role: 'contractor',
  },
  {
    id: '3',
    name: 'Mike Builder',
    email: 'mike@example.com',
    role: 'subcontractor',
  },
];

// Mock subcontractors data
export const mockSubcontractors: Subcontractor[] = [
  {
    id: '1',
    name: 'Mike Builder',
    email: 'mike@example.com',
    phone: '512-555-1234',
    zipCodes: ['78704', '78745'],
    specialties: ['TPO Roofer Labor', 'TPO Roofer w/ Materials'],
    availability: 'Available',
    licenseStatus: 'Valid',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '512-555-5678',
    zipCodes: ['78745'],
    specialties: ['Gutter Repair', 'Shinglers w/ Materials'],
    availability: 'Booked',
    licenseStatus: 'Valid',
  },
  {
    id: '3',
    name: 'David Williams',
    email: 'david@example.com',
    phone: '512-555-9012',
    zipCodes: ['78704', '78702'],
    specialties: ['Clay Tile Repair', 'Metal Roofing Labor'],
    availability: 'Available',
    licenseStatus: 'Valid',
  },
];

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: '1',
    clientName: 'Alice Cooper',
    location: '123 Main St',
    zipCode: '78704',
    jobType: 'Metal Roofing Labor',
    status: 'Open',
  },
  {
    id: '2',
    clientName: 'Bob Smith',
    location: '456 Oak Ave',
    zipCode: '78745',
    jobType: 'Gutter Installation',
    status: 'Assigned',
    subcontractorId: '2',
    quoteAmount: 1200,
  },
  {
    id: '3',
    clientName: 'Charlie Brown',
    location: '789 Pine Rd',
    zipCode: '78704',
    jobType: 'Shinglers w/ Materials',
    status: 'Completed',
    subcontractorId: '3',
    inspectorId: '3',
    quoteAmount: 2500,
  },
];

// Mock advertisements data
export const mockAds: Advertisement[] = [
  {
    id: '1',
    businessName: "Torchy's Tacos",
    imageUrl: '/ads/torchys.jpg',
    linkUrl: 'https://example.com/torchys-coupon',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    isActive: true,
    clicks: 45,
  },
  {
    id: '2',
    businessName: 'Austin Hardware Supply',
    imageUrl: '/ads/hardware.jpg',
    linkUrl: 'https://example.com/hardware-discount',
    startDate: '2023-02-15',
    endDate: '2023-11-15',
    isActive: true,
    clicks: 32,
  },
  {
    id: '3',
    businessName: 'Texas Roofing Materials',
    imageUrl: '/ads/roofing.jpg',
    linkUrl: 'https://example.com/roofing-sale',
    startDate: '2023-03-10',
    endDate: '2023-10-10',
    isActive: false,
    clicks: 18,
  },
];

// Available specialties
export const availableSpecialties: Specialty[] = [
  'TPO Roofer w/ Materials',
  'TPO Roofer Repair',
  'TPO Roofer Labor',
  'Shinglers w/ Materials',
  'Shinglers repair',
  'Shinglers Labor',
  'Metal Roofing w/ Materials',
  'Metal Roofing Labor',
  'Metal Roofing Repair',
  'Clay Tile w/ Materials',
  'Clay Tile Repair',
  'Clay Tile Labor',
  'Gutter Installer w/ Materials',
  'Gutter Installer w/ Seamless',
  'Gutter Installer Labor',
  'Gutter Repair'
];
