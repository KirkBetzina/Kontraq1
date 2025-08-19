import React from 'react';
import AppLayout from '@/components/AppLayout';
import ContractorDashboard from '@/components/dashboard/ContractorDashboard';

const ContractorPage: React.FC = () => {
  return (
    <AppLayout>
      <ContractorDashboard />
    </AppLayout>
  );
};

export default ContractorPage;
