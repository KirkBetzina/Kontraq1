import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { AlertCircle, CheckCircle, Upload, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DocumentType = 'license' | 'insurance' | 'certification';

interface DocumentUploaderProps {
  documentType: DocumentType;
  title: string;
  description?: string;
  onVerificationComplete?: (result: any) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  documentType,
  title,
  description,
  onVerificationComplete
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadState, uploadDocument, resetUpload } = useDocumentUpload();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    await uploadDocument(selectedFile, documentType);
    
    // Notify parent component when verification is complete
    if (uploadState.result && onVerificationComplete) {
      onVerificationComplete(uploadState.result);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* File Selection Area */}
        {!uploadState.isUploading && !uploadState.isProcessing && !uploadState.result && (
          <div 
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={handleUploadClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            
            <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">{selectedFile.name}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click to select or drag and drop a file here<br />
                <span className="text-xs">.PDF, .JPG, .JPEG, .PNG</span>
              </p>
            )}
          </div>
        )}
        
        {/* Progress Indicator */}
        {(uploadState.isUploading || uploadState.isProcessing) && (
          <div className="space-y-4">
            <Progress value={uploadState.progress} className="h-2" />
            <p className="text-sm text-center">
              {uploadState.isUploading ? 'Uploading document...' : 'Processing document...'}
            </p>
          </div>
        )}
        
        {/* Error Message */}
        {uploadState.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{uploadState.error}</AlertDescription>
          </Alert>
        )}
        
        {/* Success Message */}
        {uploadState.result && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Verification Complete</AlertTitle>
            <AlertDescription className="text-green-700">
              Document successfully verified.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {uploadState.result || uploadState.error ? (
          <Button onClick={handleReset} variant="outline" className="w-full">
            Upload Another Document
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button 
              onClick={handleUploadClick} 
              variant="outline" 
              className="w-1/2"
              disabled={uploadState.isUploading || uploadState.isProcessing}
            >
              Select File
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="w-1/2"
              disabled={!selectedFile || uploadState.isUploading || uploadState.isProcessing}
            >
              Upload & Verify
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentUploader;
