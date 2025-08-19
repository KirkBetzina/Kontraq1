/**
 * DocParser API integration for document verification
 */

// Base URL for Supabase functions
const SUPABASE_FUNCTION_URL = 'https://zrisgylwzfdxbwhagiks.supabase.co/functions/v1';

// Function ID for the process-document function
const PROCESS_DOCUMENT_FUNCTION_ID = 'process-document';

/**
 * Upload a document to DocParser for processing
 * @param file File to upload
 * @param documentType The type of document being uploaded
 * @returns Response from document processing
 */
export const uploadDocument = async (file: File, documentType: string): Promise<any> => {
  try {
    // In a real implementation, this would upload the file to storage first
    // For this demo, we'll just call the function with the document type
    
    const response = await fetch(`${SUPABASE_FUNCTION_URL}/${PROCESS_DOCUMENT_FUNCTION_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ documentType })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
};

/**
 * Get results for a processed document
 * @param documentId ID of the processed document
 * @returns Processed document results
 */
export const getDocumentResults = async (documentId: string): Promise<any> => {
  try {
    // In a real implementation, this would fetch the results from the API
    // For this demo, we'll just return mock data
    return getMockVerificationResults();
  } catch (error) {
    console.error('Error getting document results:', error);
    throw error;
  }
};

/**
 * For development/testing - returns mock document verification results
 */
export const getMockVerificationResults = () => {
  return {
    success: true,
    documentType: 'License',
    verificationStatus: 'Verified',
    extractedData: {
      name: 'John Doe',
      licenseNumber: 'ABC123456',
      expirationDate: '2025-12-31',
      state: 'California',
      specialty: 'Electrical'
    }
  };
};
