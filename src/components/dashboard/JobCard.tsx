import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';

interface JobCardProps {
  job: Job;
  onViewDetails: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: 'Open' | 'Assigned' | 'Completed') => void;
  showAdminControls?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onViewDetails, 
  onUpdateStatus,
  showAdminControls = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      case 'Assigned': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{job.clientName}</CardTitle>
          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 mb-2">Location: {job.location}</p>
        <p className="text-sm text-gray-500 mb-2">ZIP Code: {job.zipCode}</p>
        <p className="text-sm mb-4">Type: {job.jobType}</p>
        {job.subcontractorId && (
          <p className="text-sm text-gray-500">
            Assigned to: Subcontractor #{job.subcontractorId}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(job.id)}
        >
          View Details
        </Button>
        
        {showAdminControls && onUpdateStatus && job.status !== 'Completed' && (
          <Button 
            size="sm" 
            onClick={() => onUpdateStatus(job.id, 'Completed')}
            variant="secondary"
          >
            Mark Complete
          </Button>
        )}
        
        {!showAdminControls && onUpdateStatus && job.status === 'Open' && (
          <Button 
            size="sm" 
            onClick={() => onViewDetails(job.id)}
            variant="secondary"
          >
            Assign Job
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;