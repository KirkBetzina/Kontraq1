import React from 'react';
import { MongoDBProvider } from '../../contexts/MongoDBContext';
import MongoDBStatus from './MongoDBStatus';
import MongoDBConfig from './MongoDBConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const MongoDBDemo: React.FC = () => {
  return (
    <MongoDBProvider>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>MongoDB Integration</CardTitle>
          <CardDescription>
            This demo shows how to integrate MongoDB with the application. 
            In a production environment, you would connect to a real MongoDB instance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <MongoDBStatus />
          </div>
          <div className="flex-1">
            <MongoDBConfig />
          </div>
        </CardContent>
      </Card>
    </MongoDBProvider>
  );
};

export default MongoDBDemo;
