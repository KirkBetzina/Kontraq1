import React, { useState } from 'react';
import { Job, Subcontractor } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AssignJobModalProps {
  job: Job | null;
  subcontractors: Subcontractor[];
  isOpen: boolean;
  onClose: () => void;
  onAssign: (jobId: string, subcontractorId: string) => void;
}

const AssignJobModal: React.FC<AssignJobModalProps> = ({
  job,
  subcontractors,
  isOpen,
  onClose,
  onAssign,
}) => {
  const [selectedSubcontractorId, setSelectedSubcontractorId] = useState<string>('');

  if (!job) return null;

  // Filter subcontractors to only show available ones with valid licenses
  const availableSubcontractors = subcontractors.filter(
    (sub) => sub.availability === 'Available' && sub.licenseStatus === 'Valid'
  );

  const handleAssign = () => {
    if (selectedSubcontractorId && job.id) {
      onAssign(job.id, selectedSubcontractorId);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Job</DialogTitle>
          <DialogDescription>
            Assign this job to an available subcontractor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Job Details</h3>
            <p className="text-sm">
              <strong>Client:</strong> {job.clientName}
            </p>
            <p className="text-sm">
              <strong>Type:</strong> {job.jobType}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {job.location}, {job.zipCode}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Subcontractor</h3>
            {availableSubcontractors.length > 0 ? (
              <Select
                value={selectedSubcontractorId}
                onValueChange={setSelectedSubcontractorId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subcontractor" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcontractors.map((sub) => {
                    // Generate a safe, non-empty value for each item
                    const itemValue = sub.id || `sub-${sub.name.replace(/\s+/g, '-').toLowerCase()}`;
                    return (
                      <SelectItem 
                        key={sub.id || `sub-${sub.name}`} 
                        value={itemValue || "fallback-value"} // Ensure value is never empty
                      >
                        {sub.name} - {sub.specialties.join(', ')}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-red-500">
                No available subcontractors with valid licenses found.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            onClick={handleAssign}
            disabled={!selectedSubcontractorId || availableSubcontractors.length === 0}
          >
            Assign
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignJobModal;
