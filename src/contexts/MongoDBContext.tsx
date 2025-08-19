import React, { createContext, useContext, ReactNode } from 'react';
import useMongoDB from '../hooks/useMongoDB';
import { MongoConfig } from '../lib/mongodb';
import MongoDBService from '../services/MongoDBService';

interface MongoDBContextType {
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  connect: (config: MongoConfig) => Promise<void>;
  disconnect: () => Promise<void>;
  db: typeof MongoDBService;
}

const MongoDBContext = createContext<MongoDBContextType | undefined>(undefined);

interface MongoDBProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
  config?: MongoConfig;
}

export const MongoDBProvider: React.FC<MongoDBProviderProps> = ({
  children,
  autoConnect = false,
  config
}) => {
  const mongodb = useMongoDB({ autoConnect, config });

  return (
    <MongoDBContext.Provider value={mongodb}>
      {children}
    </MongoDBContext.Provider>
  );
};

export const useMongoDBContext = (): MongoDBContextType => {
  const context = useContext(MongoDBContext);
  if (context === undefined) {
    throw new Error('useMongoDBContext must be used within a MongoDBProvider');
  }
  return context;
};
