import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Specialty, Subcontractor } from '@/types';
import SubcontractorSpecialtySelection from './SubcontractorSpecialtySelection';
import SubcontractorZipCodeSelection from './SubcontractorZipCodeSelection';

interface SubcontractorProfileProps {
  subcontractor: Subcontractor;
  onAvailabilityChange: (available: boolean) => void;
  onSpecialtiesChange: (specialties: Specialty[]) => void;
  onZipCodesChange: (zipCodes: string[]) => void;
  isAvailable: boolean;
}

const SubcontractorProfile: React.FC<SubcontractorProfileProps> = ({
  subcontractor,
  onAvailabilityChange,
  onSpecialtiesChange,
  onZipCodesChange,
  isAvailable,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">{subcontractor.name}</h3>
            <p className="text-gray-500">{subcontractor.email}</p>
            <p className="text-gray-500">{subcontractor.phone}</p>
          </div>
          <div className="flex flex-col justify-center items-start space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="availability" 
                checked={isAvailable}
                onCheckedChange={onAvailabilityChange}
              />
              <Label htmlFor="availability">Available for Jobs</Label>
            </div>
            <Badge variant="outline" className={isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {isAvailable ? 'Available' : 'Not Available'}
            </Badge>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* Specialty Selection Component */}
          <SubcontractorSpecialtySelection
            specialties={subcontractor.specialties}
            onChange={onSpecialtiesChange}
            maxLimit={5}
          />

          {/* ZIP Code Selection Component */}
          <SubcontractorZipCodeSelection
            zipCodes={subcontractor.zipCodes}
            onChange={onZipCodesChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SubcontractorProfile;
