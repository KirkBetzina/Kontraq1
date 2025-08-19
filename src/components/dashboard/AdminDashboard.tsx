import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockSubcontractors } from '@/data/mockData';
import { useJobs } from '@/contexts/JobContext';
import { useAuth } from '@/contexts/AuthContext';
import SubcontractorCard from './SubcontractorCard';
import JobCard from './JobCard';
import { TrialManagement } from './TrialManagement';
import AdBanner from '@/components/ui/ad-banner';
import { useToast } from '@/hooks/use-toast';
import { updateSubcontractorAvailability, trackAdClick } from '@/lib/api';

const AdminDashboard: React.FC = () => {
  const { jobs, viewJobDetails, updateJobStatus } = useJobs();
  const { getPaymentStatus, updatePaymentStatus } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const { toast } = useToast();
  const [subcontractors, setSubcontractors] = useState(mockSubcontractors);
  const [ads, setAds] = useState([
    { id: '1', title: 'Roofing Supplies Ad', status: 'Active', impressions: 1245, clicks: 78 },
    { id: '2', title: 'Tool Rental Promotion', status: 'Active', impressions: 987, clicks: 42 },
    { id: '3', title: 'Insurance Services', status: 'Active', impressions: 654, clicks: 31 },
  ]);

  // Mock contractor users for admin view
  const mockContractors = [
    { id: 'contractor-1', name: 'John Smith', email: 'john@example.com', role: 'contractor' as const },
    { id: 'contractor-2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'contractor' as const },
    { id: 'contractor-3', name: 'Mike Davis', email: 'mike@example.com', role: 'contractor' as const },
  ];

  // Analytics calculations
  const totalUsers = subcontractors.length + mockContractors.length;
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(job => job.status === 'Completed').length;
  const activeAds = ads.filter(ad => ad.status === 'Active').length;

  // Handle job details view
  const handleViewJobDetails = (jobId: string) => {
    const job = viewJobDetails(jobId);
    if (job) {
      toast({
        title: 'Job Details',
        description: `Viewing details for ${job.clientName}'s job`,
      });
    }
  };

  // Handle job status update
  const handleUpdateJobStatus = (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => {
    updateJobStatus(jobId, status);
    toast({
      title: 'Job Updated',
      description: `Job status changed to ${status}`,
    });
  };

  // Handle adding a new user
  const handleAddUser = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'User creation functionality will be available soon.',
    });
  };

  // Handle adding a new job
  const handleAddJob = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'Job creation functionality will be available soon.',
    });
  };

  // Handle creating a new ad
  const handleCreateAd = () => {
    toast({
      title: 'Feature Coming Soon',
      description: 'Ad creation functionality will be available soon.',
    });
  };

  // Handle editing an ad
  const handleEditAd = (adId: string) => {
    toast({
      title: 'Edit Ad',
      description: `Editing ad ${adId}`,
    });
  };

  // Handle pausing an ad
  const handlePauseAd = (adId: string) => {
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? { ...ad, status: ad.status === 'Active' ? 'Paused' : 'Active' } : ad
      )
    );
    
    toast({
      title: 'Ad Status Updated',
      description: `Ad status has been toggled`,
    });
  };

  // Handle editing a subcontractor
  const handleEditSubcontractor = (subcontractorId: string) => {
    toast({
      title: 'Edit Subcontractor',
      description: `Editing subcontractor ${subcontractorId}`,
    });
  };

  // Handle deactivating a subcontractor
  const handleDeactivateSubcontractor = (subcontractorId: string) => {
    const updatedSubcontractors = subcontractors.map(sub => {
      if (sub.id === subcontractorId) {
        const newAvailability = sub.availability === 'Available' ? 'Booked' : 'Available';
        return { ...sub, availability: newAvailability };
      }
      return sub;
    });
    
    setSubcontractors(updatedSubcontractors);
    
    toast({
      title: 'Subcontractor Updated',
      description: `Subcontractor availability has been toggled`,
    });
  };

  // Handle updating contractor payment status
  const handleUpdatePaymentStatus = (contractorId: string, status: 'pending' | 'active' | 'expired') => {
    updatePaymentStatus(contractorId, status);
    toast({
      title: 'Payment Status Updated',
      description: `Payment status changed to ${status}`,
    });
  };

  const getPaymentStatusBadge = (contractorId: string) => {
    const status = getPaymentStatus(contractorId);
    const variant = status === 'active' ? 'default' : 
                   status === 'expired' ? 'destructive' : 'secondary';
    const text = status === 'active' ? 'Active' : 
                 status === 'expired' ? 'Expired' : 'Pending';
    return <Badge variant={variant}>{text}</Badge>;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeAds}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="trials">Trials</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Users</h2>
            <Button onClick={handleAddUser}>Add New User</Button>
          </div>
          
          {/* Contractors Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Contractors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockContractors.map(contractor => (
                <Card key={contractor.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{contractor.name}</CardTitle>
                      {getPaymentStatusBadge(contractor.id)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{contractor.email}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdatePaymentStatus(contractor.id, 'active')}
                      >
                        Activate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleUpdatePaymentStatus(contractor.id, 'expired')}
                      >
                        Expire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Subcontractors Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Subcontractors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcontractors.map(sub => (
                <SubcontractorCard 
                  key={sub.id} 
                  subcontractor={sub} 
                  onAssignJob={() => {}}
                  showAdminControls={true}
                  onEdit={() => handleEditSubcontractor(sub.id)}
                  onDeactivate={() => handleDeactivateSubcontractor(sub.id)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Jobs</h2>
            <Button onClick={handleAddJob}>Add New Job</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onViewDetails={handleViewJobDetails}
                onUpdateStatus={handleUpdateJobStatus}
                showAdminControls={true}
              />
            ))}
          </div>
        </TabsContent>
        
        {/* Trials Tab */}
        <TabsContent value="trials" className="space-y-4">
          <TrialManagement />
        </TabsContent>
        
        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ad Management</h2>
            <Button onClick={handleCreateAd}>Create New Ad</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map(ad => (
              <Card key={ad.id}>
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Status: {ad.status}</p>
                  <p className="mb-2">Impressions: {ad.impressions.toLocaleString()}</p>
                  <p className="mb-2">Clicks: {ad.clicks}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditAd(ad.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant={ad.status === 'Active' ? "destructive" : "default"} 
                      size="sm"
                      onClick={() => handlePauseAd(ad.id)}
                    >
                      {ad.status === 'Active' ? 'Pause' : 'Activate'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Preview current ads */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Ad Preview</h2>
        <AdBanner />
      </div>
    </div>
  );
};

export default AdminDashboard;