import { useState } from 'react';
import { uploadDocument, getDocumentResults, getMockVerificationResults } from '@/lib/docparser';

type DocumentType = 'license' | 'insurance' | 'certification';

interface DocumentUploadState {
  isUploading: boolean;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  result: any | null;
}

interface UseDocumentUploadReturn {
  uploadState: DocumentUploadState;
  uploadDocument: (file: File, documentType: DocumentType) => Promise<void>;
  resetUpload: () => void;
}

/**
 * Hook for handling document uploads and processing with DocParser
 */
export const useDocumentUpload = (): UseDocumentUploadReturn => {
  const [uploadState, setUploadState] = useState<DocumentUploadState>({
    isUploading: false,
    isProcessing: false,
    progress: 0,
    error: null,
    result: null
  });

  // Map document types to parser IDs (these would be real parser IDs in production)
  const parserIds: Record<DocumentType, string> = {
    license: 'license-parser-id',
    insurance: 'insurance-parser-id',
    certification: 'certification-parser-id'
  };

  const handleUpload = async (file: File, documentType: DocumentType) => {
    try {
      // Reset state
      setUploadState({
        isUploading: true,
        isProcessing: false,
        progress: 0,
        error: null,
        result: null
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 300);

      // In development, use mock data instead of actual API call
      if (process.env.NODE_ENV === 'development') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearInterval(progressInterval);
        
        setUploadState({
          isUploading: false,
          isProcessing: true,
          progress: 100,
          error: null,
          result: null
        });
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return mock results
        setUploadState({
          isUploading: false,
          isProcessing: false,
          progress: 100,
          error: null,
          result: getMockVerificationResults()
        });
        
        return;
      }

      // In production, this would use the actual API
      const parserId = parserIds[documentType];
      const uploadResponse = await uploadDocument(file, parserId);
      clearInterval(progressInterval);
      
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        isProcessing: true,
        progress: 95
      }));

      // Get the parsed results
      const documentId = uploadResponse.id;
      const results = await getDocumentResults(documentId);
      
      setUploadState({
        isUploading: false,
        isProcessing: false,
        progress: 100,
        error: null,
        result: results
      });
      
    } catch (error) {
      console.error('Document upload error:', error);
      setUploadState({
        isUploading: false,
        isProcessing: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        result: null
      });
    }
  };

  const resetUpload = () => {
    setUploadState({
      isUploading: false,
      isProcessing: false,
      progress: 0,
      error: null,
      result: null
    });
  };

  return {
    uploadState,
    uploadDocument: handleUpload,
    resetUpload
  };
};
