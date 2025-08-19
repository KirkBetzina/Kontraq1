import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleSelectionProps {
  onSelectRole: (role: 'contractor' | 'subcontractor') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Select Your Role</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-gray-600">
          Please select your role to continue to registration.
        </p>
        <div className="flex flex-col space-y-3 pt-4">
          <Button 
            size="lg" 
            onClick={() => onSelectRole('contractor')}
            className="w-full"
          >
            Continue as Contractor
          </Button>
          <Button 
            size="lg" 
            onClick={() => onSelectRole('subcontractor')}
            variant="outline"
            className="w-full"
          >
            Continue as Subcontractor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
