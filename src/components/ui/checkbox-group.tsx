import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type CheckboxOption = {
  id: string;
  label: string;
  value: string;
};

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  maxLimit?: number;
  className?: string;
  label?: string;
}

export function CheckboxGroup({
  options,
  selectedValues,
  onChange,
  maxLimit,
  className,
  label,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      // Don't add if we've reached the limit
      if (maxLimit && selectedValues.length >= maxLimit && !selectedValues.includes(value)) {
        return;
      }
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((val) => val !== value));
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-base">{label}</Label>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, checked === true)}
              disabled={
                maxLimit &&
                selectedValues.length >= maxLimit &&
                !selectedValues.includes(option.value)
              }
            />
            <Label
              htmlFor={option.id}
              className={cn(
                "text-sm font-normal",
                maxLimit &&
                  selectedValues.length >= maxLimit &&
                  !selectedValues.includes(option.value) &&
                  "text-muted-foreground"
              )}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {maxLimit && (
        <p className="text-xs text-muted-foreground">
          {selectedValues.length}/{maxLimit} selected
        </p>
      )}
    </div>
  );
}
