import React from 'react';
import { Label } from '@/components/ui/label';
import { ZipCodeInput } from '@/components/ui/zip-code-input';

interface SubcontractorZipCodeSelectionProps {
  zipCodes: string[];
  onChange: (zipCodes: string[]) => void;
}

const SubcontractorZipCodeSelection: React.FC<SubcontractorZipCodeSelectionProps> = ({
  zipCodes,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="zipCodes" className="block mb-2">Service Areas (ZIP Codes)</Label>
      <ZipCodeInput
        zipCodes={zipCodes}
        onChange={onChange}
        maxLimit={3} // Maximum of 3 ZIP codes as requested
      />
      <p className="text-xs text-gray-500 mt-1">
        You can add up to 3 ZIP codes where you provide services
      </p>
    </div>
  );
};

export default SubcontractorZipCodeSelection;
