import React, { useState } from 'react';
import { useMongoDBContext } from '../../contexts/MongoDBContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const MongoDBConfig: React.FC = () => {
  const { connect, isConnecting } = useMongoDBContext();
  const [uri, setUri] = useState<string>('mongodb://localhost:27017');
  const [dbName, setDbName] = useState<string>('contractor_app');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    await connect({ uri, dbName });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>MongoDB Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="uri">Connection URI</Label>
            <Input
              id="uri"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              placeholder="mongodb://localhost:27017"
              disabled={isConnecting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dbName">Database Name</Label>
            <Input
              id="dbName"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              placeholder="contractor_app"
              disabled={isConnecting}
            />
          </div>
          <CardFooter className="px-0">
            <Button type="submit" disabled={isConnecting} className="w-full">
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default MongoDBConfig;
