import React, { createContext, useContext } from 'react';

interface AppContextType {
  // Add any app-level state or functions here if needed
  appName: string;
}

const defaultAppContext: AppContextType = {
  appName: 'Kontraq.io'
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        appName: 'Kontraq.io'
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
