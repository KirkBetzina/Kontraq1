import { useState, useEffect, useCallback } from 'react';
import MongoDBService from '../services/MongoDBService';
import { MongoConfig } from '../lib/mongodb';

interface UseMongoDBProps {
  autoConnect?: boolean;
  config?: MongoConfig;
}

interface UseMongoDBReturn {
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  connect: (config: MongoConfig) => Promise<void>;
  disconnect: () => Promise<void>;
  db: typeof MongoDBService;
}

// Default MongoDB configuration
const defaultConfig: MongoConfig = {
  uri: 'mongodb://localhost:27017',
  dbName: 'contractor_app',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};

export const useMongoDB = ({
  autoConnect = false,
  config = defaultConfig
}: UseMongoDBProps = {}): UseMongoDBReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback(async (connectionConfig: MongoConfig) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await MongoDBService.initialize(connectionConfig);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect to MongoDB'));
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await MongoDBService.disconnect();
      setIsConnected(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disconnect from MongoDB'));
    }
  }, []);

  // Auto-connect if enabled
  useEffect(() => {
    if (autoConnect && !isConnected && !isConnecting) {
      connect(config);
    }

    // Cleanup on unmount
    return () => {
      if (isConnected) {
        MongoDBService.disconnect().catch(console.error);
      }
    };
  }, [autoConnect, config, connect, isConnected, isConnecting]);

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    db: MongoDBService
  };
};

export default useMongoDB;
