import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Subcontractor } from '@/types';
import { mockJobs, mockSubcontractors } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { fetchJobs, assignJob, updateJobStatus } from '@/lib/api';

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  viewJobDetails: (jobId: string) => Job | undefined;
  updateJobStatus: (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => Promise<void>;
  assignJobToSubcontractor: (jobId: string, subcontractorId: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch jobs from API on component mount
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        // Uncomment for production use with real API
        // const jobsData = await fetchJobs();
        // setJobs(jobsData);
        
        // Using mock data for now
        setJobs(mockJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load jobs. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [toast]);

  const viewJobDetails = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const handleUpdateJobStatus = async (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => {
    try {
      setLoading(true);
      
      // Uncomment for production use with real API
      // await updateJobStatus(jobId, status);
      
      // Using local state update for now
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, status } : job
        )
      );
      
      toast({
        title: 'Job Updated',
        description: `Job status changed to ${status}`,
      });
    } catch (error) {
      console.error('Failed to update job status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update job status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const assignJobToSubcontractor = async (jobId: string, subcontractorId: string) => {
    try {
      setLoading(true);
      const subcontractor = mockSubcontractors.find(sub => sub.id === subcontractorId);
      
      if (!subcontractor) {
        throw new Error('Subcontractor not found');
      }
      
      // Uncomment for production use with real API
      // await assignJob(jobId, subcontractorId);
      
      // Using local state update for now
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, status: 'Assigned', subcontractorId } : job
        )
      );
      
      toast({
        title: 'Job Assigned',
        description: `Job assigned to ${subcontractor.name}`,
      });
    } catch (error) {
      console.error('Failed to assign job:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign job. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      loading,
      viewJobDetails, 
      updateJobStatus: handleUpdateJobStatus, 
      assignJobToSubcontractor 
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
