import React from 'react';
import { Label } from '@/components/ui/label';
import { CheckboxGroup, CheckboxOption } from '@/components/ui/checkbox-group';
import { availableSpecialties } from '@/data/mockData';
import { Specialty } from '@/types';

interface SubcontractorSpecialtySelectionProps {
  specialties: Specialty[];
  onChange: (specialties: Specialty[]) => void;
  maxLimit?: number;
}

const SubcontractorSpecialtySelection: React.FC<SubcontractorSpecialtySelectionProps> = ({
  specialties,
  onChange,
  maxLimit = 10
}) => {
  // Convert available specialties to options format for CheckboxGroup
  const specialtyOptions: CheckboxOption[] = availableSpecialties.map((specialty, index) => ({
    id: `specialty-${index}`,
    value: specialty,
    label: specialty,
  }));

  return (
    <div className="space-y-2">
      <Label htmlFor="specialties" className="block mb-2">Your Specialties</Label>
      <CheckboxGroup
        options={specialtyOptions}
        selectedValues={specialties}
        onChange={(selected) => onChange(selected as Specialty[])}
        maxLimit={maxLimit}
        label="Select multiple specialties to match with more jobs"
      />
    </div>
  );
};

export default SubcontractorSpecialtySelection;
