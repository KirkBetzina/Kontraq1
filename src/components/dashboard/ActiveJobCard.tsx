import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';

interface ActiveJobCardProps {
  job: Job;
  subcontractorName: string;
  onViewDetails: (jobId: string) => void;
  onComplete: (jobId: string) => void;
}

const ActiveJobCard: React.FC<ActiveJobCardProps> = ({ 
  job, 
  subcontractorName,
  onViewDetails, 
  onComplete
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{job.clientName}</CardTitle>
          <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 mb-2">Location: {job.location}</p>
        <p className="text-sm text-gray-500 mb-2">ZIP Code: {job.zipCode}</p>
        <p className="text-sm mb-4">Type: {job.jobType}</p>
        <p className="text-sm font-medium text-blue-600">
          Assigned to: {subcontractorName}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(job.id)}
        >
          View Details
        </Button>
        <Button 
          size="sm" 
          onClick={() => onComplete(job.id)}
          variant="secondary"
        >
          Mark Complete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveJobCard;