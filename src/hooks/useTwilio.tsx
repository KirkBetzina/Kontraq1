import { useState, useCallback } from 'react';
import { sendSMS, makeCall, getTwilioToken, SMSConfig, CallConfig } from '@/lib/twilio';

/**
 * Custom hook for Twilio functionality
 * Provides methods for sending SMS messages and making calls
 */
export function useTwilio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Send an SMS message
   */
  const sendMessage = useCallback(async (config: SMSConfig) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await sendSMS(config);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send SMS'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Make a voice call
   */
  const initiateCall = useCallback(async (config: CallConfig) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await makeCall(config);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to make call'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get a Twilio client token for browser-based calling
   */
  const getClientToken = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = await getTwilioToken(userId);
      return token;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get token'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    sendMessage,
    initiateCall,
    getClientToken
  };
}
