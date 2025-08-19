import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RoleSelection from '@/components/auth/RoleSelection';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (role: 'contractor' | 'subcontractor') => {
    setSelectedRole(role);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { success, role } = await login(email, password);
      
      if (success) {
        // Navigate based on the role returned from login
        if (role === 'contractor') {
          navigate('/contractor');
        } else if (role === 'subcontractor') {
          navigate('/subcontractor');
        } else if (role === 'admin') {
          navigate('/admin');
        }
        
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {!selectedRole ? (
          <>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600">Please select your role to continue</p>
            </div>
            <RoleSelection onSelectRole={handleRoleSelect} />
            <div className="mt-4 text-center">
              <button 
                className="text-blue-600 hover:underline" 
                onClick={() => navigate('/login')}
              >
                Admin Login
              </button>
            </div>
            <div className="mt-2 text-center">
              <button 
                className="text-blue-600 hover:underline" 
                onClick={() => navigate('/signup')}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              {selectedRole === 'contractor' ? 'Contractor' : 'Subcontractor'} Login
            </h1>
            <LoginForm onLogin={handleLogin} />
            <div className="mt-4 text-center space-y-2">
              <button 
                className="text-blue-600 hover:underline block w-full" 
                onClick={handleBack}
              >
                Back to Role Selection
              </button>
              <button 
                className="text-blue-600 hover:underline block w-full" 
                onClick={() => navigate('/signup')}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
