import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AdBanner from '@/components/ui/ad-banner';
import { useToast } from '@/hooks/use-toast';
import SubcontractorSpecialtySelection from './SubcontractorSpecialtySelection';
import SubcontractorZipCodeSelection from './SubcontractorZipCodeSelection';
import { Specialty } from '@/types';
import { Link } from 'react-router-dom';

interface SubcontractorDashboardProps {
  subcontractorId: string;
  initialData: {
    name: string;
    availability: 'Available' | 'Booked';
    zipCodes: string[];
    specialties: string[];
  };
}

const SubcontractorDashboard: React.FC<SubcontractorDashboardProps> = ({ 
  subcontractorId,
  initialData 
}) => {
  const [availability, setAvailability] = useState<'Available' | 'Booked'>(initialData.availability);
  const [zipCodes, setZipCodes] = useState<string[]>(initialData.zipCodes || []);
  const [specialties, setSpecialties] = useState<string[]>(initialData.specialties || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleAvailabilityChange = (checked: boolean) => {
    setAvailability(checked ? 'Available' : 'Booked');
  };

  const handleUpdateAvailability = async () => {
    try {
      setIsUpdating(true);
      
      // In production, this would use the API call
      // For now, just simulate success
      console.log('Updating availability:', {
        subcontractorId,
        availability,
        zipCodes,
        specialties
      });
      
      // Show success message
      toast({
        title: 'Availability Updated',
        description: `Your status is now set to ${availability}`,
      });
    } catch (error) {
      console.error('Failed to update availability:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update your availability. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Subcontractor Dashboard</h1>
      <h2 className="text-xl">Welcome, {initialData.name}</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Update Your Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="availability" 
              checked={availability === 'Available'}
              onCheckedChange={handleAvailabilityChange}
            />
            <Label htmlFor="availability">
              Status: <span className={availability === 'Available' ? 'text-green-600' : 'text-red-600'}>
                {availability}
              </span>
            </Label>
          </div>
          
          <div className="space-y-4">
            {/* ZIP Code Selection */}
            <SubcontractorZipCodeSelection
              zipCodes={zipCodes}
              onChange={setZipCodes}
            />
            
            {/* Specialty Selection */}
            <SubcontractorSpecialtySelection
              specialties={specialties as Specialty[]}
              onChange={(selected) => setSpecialties(selected)}
            />
          </div>
          
          <Button 
            onClick={handleUpdateAvailability} 
            disabled={isUpdating}
            className="w-full md:w-auto"
          >
            {isUpdating ? 'Updating...' : 'Update Availability'}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Assigned Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You have no assigned jobs at the moment.</p>
        </CardContent>
      </Card>
      
      {/* Document Verification Card */}
      <Card>
        <CardHeader>
          <CardTitle>Document Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Upload and verify your license, insurance, and certifications to increase your chances of getting jobs.
          </p>
          <Button asChild>
            <Link to="/document-verification">Verify Documents</Link>
          </Button>
        </CardContent>
      </Card>
      
      <AdBanner className="mt-6" />
    </div>
  );
};

export default SubcontractorDashboard;
