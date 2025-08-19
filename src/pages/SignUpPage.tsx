import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RoleSelection from '@/components/auth/RoleSelection';
import SignUpForm from '@/components/auth/SignUpForm';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

const SignUpPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (role: 'contractor' | 'subcontractor') => {
    setSelectedRole(role);
  };

  const handleSignUp = async (name: string, email: string, password: string, phone?: string) => {
    if (!selectedRole) return;
    
    try {
      // Call the signup function from AuthContext
      const success = await signup(name, email, password, selectedRole, phone);
      
      if (success) {
        toast({
          title: 'Account created',
          description: 'Your account has been created successfully',
        });
        
        // Navigate to the appropriate dashboard based on role
        if (selectedRole === 'contractor') {
          navigate('/contractor');
        } else if (selectedRole === 'subcontractor') {
          navigate('/subcontractor');
        }
      } else {
        toast({
          title: 'Sign Up Error',
          description: 'This email may already be in use',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Sign Up Error',
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
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-gray-600">Please select your role to continue</p>
            </div>
            <RoleSelection onSelectRole={handleRoleSelect} />
            <div className="mt-4 text-center">
              <button 
                className="text-blue-600 hover:underline" 
                onClick={() => navigate('/login')}
              >
                Already have an account? Login
              </button>
            </div>
          </>
        ) : (
          <>
            <SignUpForm 
              role={selectedRole} 
              onSignUp={handleSignUp} 
              onBack={handleBack} 
            />
            <div className="mt-4 text-center">
              <button 
                className="text-blue-600 hover:underline" 
                onClick={() => navigate('/login')}
              >
                Already have an account? Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
