import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
           <img
            src={'../Primary_Large_Cropped_KontraqIO.jpg'}
            alt="Kontraq.io Logo"
            className="h-16 w-auto mb-4" // Adjust height and margin as needed
          />
          <CardTitle className="text-2xl text-center">Kontraq.io</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Welcome to Kontraq.io. Please login or sign up to continue.
          </p>
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Login
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              variant="outline"
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm text-gray-700">
            <p className="font-medium">Demo Information:</p>
            <p>- Create a new contractor or subcontractor account</p>
            <p>- Or use admin demo: admin@example.com / password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
