import React from 'react';
import { useToast } from '@/hooks/use-toast';
import DocumentVerificationPanel from '@/components/document/DocumentVerificationPanel';
import AppLayout from '@/components/AppLayout';

type DocumentType = 'license' | 'insurance' | 'certification';

const DocumentVerificationPage: React.FC = () => {
  const { toast } = useToast();

  const handleVerificationComplete = (documentType: DocumentType, result: any) => {
    // In a real app, you might want to update user profile or send data to backend
    console.log(`${documentType} verification completed:`, result);
    
    toast({
      title: 'Verification Complete',
      description: `Your ${documentType} has been successfully verified.`,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Document Verification</h1>
        
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Why Verify Your Documents?</h2>
          <p className="text-muted-foreground mb-4">
            Document verification helps us ensure that all contractors on our platform 
            are properly licensed and insured. This protects both you and your clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Increased Trust</h3>
              <p className="text-sm text-muted-foreground">
                Verified contractors receive a trust badge visible to potential clients.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">More Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                Many clients only work with fully verified contractors.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Faster Payments</h3>
              <p className="text-sm text-muted-foreground">
                Verified contractors receive expedited payment processing.
              </p>
            </div>
          </div>
        </div>
        
        <DocumentVerificationPanel onVerificationComplete={handleVerificationComplete} />
      </div>
    </AppLayout>
  );
};

export default DocumentVerificationPage;
