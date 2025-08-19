import React from 'react';
import AppLayout from '@/components/AppLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const AdminPage: React.FC = () => {
  return (
    <AppLayout>
      <AdminDashboard />
    </AppLayout>
  );
};

export default AdminPage;