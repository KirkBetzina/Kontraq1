import React, { useState, useMemo, useEffect } from 'react';
import { mockSubcontractors, availableSpecialties } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import SubcontractorCard from './SubcontractorCard';
import JobCard from './JobCard';
import ActiveJobCard from './ActiveJobCard';
import JobDetailsModal from '../modals/JobDetailsModal';
import AssignJobModal from '../modals/AssignJobModal';
import { TrialExpiredModal } from '../modals/TrialExpiredModal';
import { useJobs } from '@/contexts/JobContext';
import { useAuth } from '@/contexts/AuthContext';
import { Job, Specialty } from '@/types';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContractorDashboard: React.FC = () => {
  const { jobs, viewJobDetails, updateJobStatus, assignJobToSubcontractor } = useJobs();
  const { user, getTrialInfo, getPaymentStatus, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [zipCodeFilter, setZipCodeFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | ''>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState(false);
  
  // Get trial and payment info
  const trialInfo = user ? getTrialInfo(user.id) : null;
  const paymentStatus = user ? getPaymentStatus(user.id) : 'pending';
  
  // Check if trial expired and payment not active
  useEffect(() => {
    if (user && trialInfo && !trialInfo.isTrialActive && paymentStatus !== 'active') {
      setShowTrialExpiredModal(true);
    }
  }, [user, trialInfo, paymentStatus]);
  
  // Filter subcontractors based on filters
  const filteredSubcontractors = mockSubcontractors.filter(sub => {
    const matchesZip = !zipCodeFilter || sub.zipCodes.includes(zipCodeFilter);
    const matchesSpecialty = !specialtyFilter || sub.specialties.includes(specialtyFilter);
    return matchesZip && matchesSpecialty;
  });
  
  // Get unique ZIP codes for the filter dropdown
  const zipCodes = Array.from(new Set(mockSubcontractors.flatMap(sub => sub.zipCodes)));
  
  // Get active jobs (assigned but not completed)
  const activeJobs = useMemo(() => {
    return jobs.filter(job => job.status === 'Assigned');
  }, [jobs]);

  // Get open jobs
  const openJobs = useMemo(() => {
    return jobs.filter(job => job.status === 'Open');
  }, [jobs]);
  
  // Calculate analytics
  const jobsThisMonth = jobs.filter(job => job.status === 'Completed').length;
  const totalAssignedJobs = jobs.filter(job => 
    job.status === 'Assigned' || job.status === 'Completed'
  ).length;
  const successRate = totalAssignedJobs > 0 
    ? Math.round((jobsThisMonth / totalAssignedJobs) * 100) 
    : 0;

  // Get subcontractor name by ID
  const getSubcontractorName = (subcontractorId?: string) => {
    if (!subcontractorId) return 'Unknown';
    const subcontractor = mockSubcontractors.find(sub => sub.id === subcontractorId);
    return subcontractor ? subcontractor.name : 'Unknown';
  };

  // Handle job details view
  const handleViewJobDetails = (jobId: string) => {
    const job = viewJobDetails(jobId);
    if (job) {
      setSelectedJob(job);
      setIsDetailsModalOpen(true);
    }
  };

  // Handle job status update
  const handleUpdateJobStatus = (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => {
    updateJobStatus(jobId, status);
  };

  // Handle opening assign modal
  const handleOpenAssignModal = () => {
    if (selectedJob) {
      setIsDetailsModalOpen(false);
      setIsAssignModalOpen(true);
    }
  };

  // Handle job assignment
  const handleAssignJob = (jobId: string, subcontractorId: string) => {
    assignJobToSubcontractor(jobId, subcontractorId);
  };

  // Handle assigning job from subcontractor card
  const handleAssignFromSubcontractor = (subcontractorId: string) => {
    const openJobs = jobs.filter(job => job.status === 'Open');
    if (openJobs.length > 0) {
      assignJobToSubcontractor(openJobs[0].id, subcontractorId);
    }
  };

  const handlePaymentSuccess = () => {
    if (user) {
      updatePaymentStatus(user.id, 'active');
      setShowTrialExpiredModal(false);
    }
  };

  const getPaymentStatusBadge = () => {
    const variant = paymentStatus === 'active' ? 'default' : 
                   paymentStatus === 'expired' ? 'destructive' : 'secondary';
    const text = paymentStatus === 'active' ? 'Active' : 
                 paymentStatus === 'expired' ? 'Expired' : 'Pending';
    return <Badge variant={variant}>{text}</Badge>;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Contractor Dashboard</h1>
          {getPaymentStatusBadge()}
        </div>
        <Button 
          onClick={() => navigate('/payments')}
          className="flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          Payments & Billing
        </Button>
      </div>
      
      {/* Trial Status */}
      {trialInfo && (
        <Card className={`${!trialInfo.isTrialActive ? 'border-orange-200 bg-orange-50' : 'border-blue-200 bg-blue-50'}`}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {trialInfo.isTrialActive ? 'Trial Active' : 'Trial Expired'}
                </p>
                <p className="text-sm text-gray-600">
                  {trialInfo.isTrialActive 
                    ? `${trialInfo.daysRemaining} days remaining` 
                    : 'Please upgrade to continue using all features'
                  }
                </p>
              </div>
              <Badge variant={trialInfo.isTrialActive ? 'default' : 'destructive'}>
                {trialInfo.isTrialActive ? 'Active' : 'Expired'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Jobs Closed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{jobsThisMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeJobs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Job Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{successRate}%</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Select value={zipCodeFilter} onValueChange={setZipCodeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by ZIP Code" />
            </SelectTrigger>
            <SelectContent>
              {zipCodes.map(zip => (
                <SelectItem key={zip} value={zip}>{zip}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/2">
          <Select value={specialtyFilter} onValueChange={(value) => setSpecialtyFilter(value as Specialty | '')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder">All Specialties</SelectItem>
              {availableSpecialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Active Jobs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeJobs.map(job => (
            <ActiveJobCard 
              key={job.id} 
              job={job} 
              subcontractorName={getSubcontractorName(job.subcontractorId)}
              onViewDetails={handleViewJobDetails}
              onComplete={() => handleUpdateJobStatus(job.id, 'Completed')}
            />
          ))}
          {activeJobs.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No active jobs</p>
          )}
        </div>
      </div>
      
      {/* Available Subcontractors */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Subcontractors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubcontractors.map(sub => (
            <SubcontractorCard 
              key={sub.id} 
              subcontractor={sub} 
              onAssignJob={handleAssignFromSubcontractor}
            />
          ))}
          {filteredSubcontractors.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No subcontractors match your filters</p>
          )}
        </div>
      </div>
      
      {/* Open Jobs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Open Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onViewDetails={handleViewJobDetails}
              onUpdateStatus={handleUpdateJobStatus}
            />
          ))}
          {openJobs.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No open jobs</p>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onAssign={handleOpenAssignModal}
        onComplete={() => selectedJob && updateJobStatus(selectedJob.id, 'Completed')}
      />

      {/* Assign Job Modal */}
      <AssignJobModal
        job={selectedJob}
        subcontractors={mockSubcontractors}
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignJob}
      />

      {/* Trial Expired Modal */}
      <TrialExpiredModal
        isOpen={showTrialExpiredModal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default ContractorDashboard;