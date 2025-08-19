import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentUploader from './DocumentUploader';
import VerificationResult from './VerificationResult';

type DocumentType = 'license' | 'insurance' | 'certification';

interface DocumentVerificationPanelProps {
  onVerificationComplete?: (documentType: DocumentType, result: any) => void;
}

const DocumentVerificationPanel: React.FC<DocumentVerificationPanelProps> = ({ 
  onVerificationComplete 
}) => {
  const [verificationResults, setVerificationResults] = useState<Record<DocumentType, any>>({} as Record<DocumentType, any>);
  
  const handleVerificationComplete = (documentType: DocumentType, result: any) => {
    setVerificationResults(prev => ({
      ...prev,
      [documentType]: result
    }));
    
    if (onVerificationComplete) {
      onVerificationComplete(documentType, result);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Document Verification</h2>
      <p className="text-muted-foreground mb-6">
        Upload your documents for verification. We accept licenses, insurance certificates, and professional certifications.
      </p>
      
      <Tabs defaultValue="license" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="license">License</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="license" className="mt-4">
          {verificationResults.license ? (
            <VerificationResult result={verificationResults.license} />
          ) : (
            <DocumentUploader
              documentType="license"
              title="License Verification"
              description="Upload your professional or contractor license for verification."
              onVerificationComplete={(result) => handleVerificationComplete('license', result)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="insurance" className="mt-4">
          {verificationResults.insurance ? (
            <VerificationResult result={verificationResults.insurance} />
          ) : (
            <DocumentUploader
              documentType="insurance"
              title="Insurance Verification"
              description="Upload your liability insurance certificate for verification."
              onVerificationComplete={(result) => handleVerificationComplete('insurance', result)}
            />
          )}
        </TabsContent>
        
        <TabsContent value="certification" className="mt-4">
          {verificationResults.certification ? (
            <VerificationResult result={verificationResults.certification} />
          ) : (
            <DocumentUploader
              documentType="certification"
              title="Certification Verification"
              description="Upload any professional certifications for verification."
              onVerificationComplete={(result) => handleVerificationComplete('certification', result)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentVerificationPanel;
