import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface VerificationResultProps {
  result: {
    success: boolean;
    documentType: string;
    verificationStatus: 'Verified' | 'Rejected' | 'Pending';
    extractedData: {
      name?: string;
      licenseNumber?: string;
      expirationDate?: string;
      state?: string;
      specialty?: string;
      [key: string]: any;
    };
  };
}

const VerificationResult: React.FC<VerificationResultProps> = ({ result }) => {
  const { success, documentType, verificationStatus, extractedData } = result;
  
  const getBadgeVariant = () => {
    switch (verificationStatus) {
      case 'Verified':
        return 'success';
      case 'Rejected':
        return 'destructive';
      case 'Pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };
  
  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'Verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Document Verification Results</CardTitle>
          <Badge 
            variant={getBadgeVariant() as any} 
            className="flex items-center gap-1"
          >
            {getStatusIcon()}
            {verificationStatus}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm">Document Type</h3>
          <p>{documentType}</p>
        </div>
        
        {extractedData && Object.keys(extractedData).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Extracted Information</h3>
            
            <div className="bg-muted/50 rounded-md p-3 space-y-2">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!success && (
          <div className="text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Verification failed. Please try uploading a clearer document.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
