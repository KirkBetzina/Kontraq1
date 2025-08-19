import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ZipCodeInputProps {
  zipCodes: string[];
  onChange: (zipCodes: string[]) => void;
  maxLimit?: number;
  className?: string;
}

export function ZipCodeInput({
  zipCodes,
  onChange,
  maxLimit = 3,
  className,
}: ZipCodeInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAddZipCode = () => {
    if (!inputValue.trim()) return;
    
    // Basic ZIP code validation (5 digits for US)
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(inputValue)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    // Check if already exists
    if (zipCodes.includes(inputValue)) {
      setInputValue("");
      return;
    }

    // Check max limit
    if (maxLimit && zipCodes.length >= maxLimit) {
      alert(`You can only add up to ${maxLimit} ZIP codes`);
      return;
    }

    onChange([...zipCodes, inputValue]);
    setInputValue("");
  };

  const handleRemoveZipCode = (zipCode: string) => {
    onChange(zipCodes.filter((z) => z !== zipCode));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddZipCode();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2 mb-2">
        {zipCodes.map((zipCode) => (
          <Badge key={zipCode} variant="secondary" className="text-sm py-1 px-2">
            {zipCode}
            <button
              type="button"
              onClick={() => handleRemoveZipCode(zipCode)}
              className="ml-1 rounded-full outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ZIP code${maxLimit ? ` (${zipCodes.length}/${maxLimit})` : ''}`}
          className="flex-1"
          disabled={maxLimit ? zipCodes.length >= maxLimit : false}
        />
        <Button 
          type="button" 
          onClick={handleAddZipCode}
          disabled={maxLimit ? zipCodes.length >= maxLimit : false}
          size="sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
