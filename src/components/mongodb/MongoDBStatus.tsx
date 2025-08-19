import React from 'react';
import { useMongoDBContext } from '../../contexts/MongoDBContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface MongoDBStatusProps {
  showControls?: boolean;
  className?: string;
}

const MongoDBStatus: React.FC<MongoDBStatusProps> = ({
  showControls = true,
  className = ''
}) => {
  const { isConnected, isConnecting, error, connect, disconnect, db } = useMongoDBContext();

  const handleConnect = async () => {
    await connect({
      uri: 'mongodb://localhost:27017',
      dbName: 'contractor_app'
    });
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          MongoDB Status
          <Badge variant={isConnected ? 'success' : 'destructive'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>
              {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {isConnected && (
            <div className="flex justify-between">
              <span className="font-medium">Database:</span>
              <span>{db.isConnected() ? db['users'].collectionName : 'N/A'}</span>
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-2">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}
        </div>
      </CardContent>
      {showControls && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleConnect}
            disabled={isConnected || isConnecting}
          >
            Connect
          </Button>
          <Button
            variant="outline"
            onClick={handleDisconnect}
            disabled={!isConnected || isConnecting}
          >
            Disconnect
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MongoDBStatus;
