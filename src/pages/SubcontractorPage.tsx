import React from 'react';
import AppLayout from '@/components/AppLayout';
import SubcontractorDashboard from '@/components/dashboard/SubcontractorDashboard';

const SubcontractorPage: React.FC = () => {
  // Mock data for the subcontractor
  const mockSubcontractorData = {
    subcontractorId: '123',
    initialData: {
      name: 'John Doe',
      availability: 'Available' as const,
      zipCodes: ['78704'],
      specialties: ['']
    }
  };

  return (
    <AppLayout>
      <SubcontractorDashboard 
        subcontractorId={mockSubcontractorData.subcontractorId}
        initialData={mockSubcontractorData.initialData}
      />
    </AppLayout>
  );
};

export default SubcontractorPage;
