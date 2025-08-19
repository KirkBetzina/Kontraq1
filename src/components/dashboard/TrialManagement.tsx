import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, User, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface TrialUser {
  id: string;
  name: string;
  email: string;
  role: string;
  trialStartDate: Date;
  trialEndDate: Date;
  isTrialActive: boolean;
  daysRemaining: number;
  paymentStatus: 'pending' | 'active' | 'expired';
}

// Mock trial data with payment status
const mockTrialUsers: TrialUser[] = [
  {
    id: '1',
    name: 'John Contractor',
    email: 'john@contractor.com',
    role: 'contractor',
    trialStartDate: new Date('2024-01-01'),
    trialEndDate: new Date('2024-01-15'),
    isTrialActive: true,
    daysRemaining: 8,
    paymentStatus: 'pending'
  },
  {
    id: '2',
    name: 'Jane Builder',
    email: 'jane@builder.com',
    role: 'contractor',
    trialStartDate: new Date('2023-12-20'),
    trialEndDate: new Date('2024-01-03'),
    isTrialActive: false,
    daysRemaining: 0,
    paymentStatus: 'expired'
  },
  {
    id: '3',
    name: 'Mike Construction',
    email: 'mike@construction.com',
    role: 'contractor',
    trialStartDate: new Date('2024-01-05'),
    trialEndDate: new Date('2024-01-19'),
    isTrialActive: true,
    daysRemaining: 12,
    paymentStatus: 'active'
  }
];

export const TrialManagement: React.FC = () => {
  const { toast } = useToast();
  const { updatePaymentStatus } = useAuth();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExtendTrial = (userId: string) => {
    toast({
      title: "Trial Extended",
      description: "User trial has been extended by 7 days"
    });
  };

  const handleEndTrial = (userId: string) => {
    toast({
      title: "Trial Ended",
      description: "User trial has been terminated",
      variant: "destructive"
    });
  };

  const handleUpdatePaymentStatus = (userId: string, status: 'pending' | 'active' | 'expired') => {
    updatePaymentStatus(userId, status);
    toast({
      title: "Payment Status Updated",
      description: `Payment status changed to ${status}`
    });
  };

  const getPaymentStatusBadge = (status: 'pending' | 'active' | 'expired') => {
    const variant = status === 'active' ? 'default' : 
                   status === 'expired' ? 'destructive' : 'secondary';
    const text = status === 'active' ? 'Active' : 
                 status === 'expired' ? 'Expired' : 'Pending';
    return <Badge variant={variant}>{text}</Badge>;
  };

  const activeTrials = mockTrialUsers.filter(user => user.isTrialActive);
  const expiredTrials = mockTrialUsers.filter(user => !user.isTrialActive);
  const expiringTrials = activeTrials.filter(user => user.daysRemaining <= 3);
  const paidUsers = mockTrialUsers.filter(user => user.paymentStatus === 'active');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Active Trials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeTrials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{expiringTrials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Expired Trials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{expiredTrials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paid Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{paidUsers.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Trial Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trial Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Trial Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrialUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{formatDate(user.trialStartDate)}</TableCell>
                  <TableCell>{formatDate(user.trialEndDate)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.isTrialActive ? "default" : "secondary"}
                      className={user.daysRemaining <= 3 && user.isTrialActive ? "bg-orange-500" : ""}
                    >
                      {user.isTrialActive ? 'Active' : 'Expired'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(user.paymentStatus)}
                  </TableCell>
                  <TableCell>
                    {user.isTrialActive ? user.daysRemaining : 0}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {user.isTrialActive ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleExtendTrial(user.id)}
                          >
                            Extend
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleEndTrial(user.id)}
                          >
                            End
                          </Button>
                        </>
                      ) : (
                        <Badge variant="secondary">Expired</Badge>
                      )}
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdatePaymentStatus(user.id, 'active')}
                          className="text-xs"
                        >
                          Activate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdatePaymentStatus(user.id, 'expired')}
                          className="text-xs"
                        >
                          Expire
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};