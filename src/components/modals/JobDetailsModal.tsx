import React from 'react';
import { Job } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign?: () => void;
  onComplete?: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  onAssign,
  onComplete,
}) => {
  if (!job) return null;

  const getStatusColor = () => {
    switch (job.status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'Assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{job.clientName}</span>
            <Badge variant="outline" className={getStatusColor()}>
              {job.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>{job.jobType}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Location:</div>
            <div>{job.location}</div>

            <div className="text-sm font-medium">ZIP Code:</div>
            <div>{job.zipCode}</div>

            {job.quoteAmount && (
              <>
                <div className="text-sm font-medium">Quote Amount:</div>
                <div>${job.quoteAmount.toLocaleString()}</div>
              </>
            )}

            {job.subcontractorId && (
              <>
                <div className="text-sm font-medium">Subcontractor ID:</div>
                <div>{job.subcontractorId}</div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          {job.status === 'Open' && onAssign && (
            <Button onClick={onAssign}>Assign Job</Button>
          )}
          {job.status === 'Assigned' && onComplete && (
            <Button onClick={onComplete}>Mark as Completed</Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
