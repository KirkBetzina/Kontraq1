import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Subcontractor } from '@/types';

interface SubcontractorCardProps {
  subcontractor: Subcontractor;
  onAssignJob: (subcontractorId: string) => void;
  showAdminControls?: boolean;
  onEdit?: (subcontractorId: string) => void;
  onDeactivate?: (subcontractorId: string) => void;
}

const SubcontractorCard: React.FC<SubcontractorCardProps> = ({ 
  subcontractor, 
  onAssignJob,
  showAdminControls = false,
  onEdit,
  onDeactivate
}) => {
  const getAvailabilityColor = (availability: string) => {
    return availability === 'Available' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{subcontractor.name}</CardTitle>
          <Badge className={getAvailabilityColor(subcontractor.availability)}>
            {subcontractor.availability}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Email: {subcontractor.email}</p>
          <p className="text-sm text-gray-500">Phone: {subcontractor.phone}</p>
          <p className="text-sm text-gray-500">ZIP Codes: {subcontractor.zipCodes.join(', ')}</p>
          <p className="text-sm">Specialties: {subcontractor.specialties.join(', ')}</p>
          <div className="flex items-center mt-2">
            <span className="text-sm mr-2">License:</span>
            <Badge className={getLicenseStatusColor(subcontractor.licenseStatus)}>
              {subcontractor.licenseStatus}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showAdminControls && subcontractor.availability === 'Available' && (
          <Button 
            size="sm" 
            onClick={() => onAssignJob(subcontractor.id)}
            className="w-full"
          >
            Assign Job
          </Button>
        )}
        
        {showAdminControls && (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onEdit && onEdit(subcontractor.id)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={() => onDeactivate && onDeactivate(subcontractor.id)}
            >
              {subcontractor.availability === 'Available' ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubcontractorCard;
