import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock storage for payment data
const paymentStorage: Record<string, { paypalLink: string }> = {};

const PaymentsPage: React.FC = () => {
  const { user, getTrialInfo, getPaymentStatus, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paypalLink, setPaypalLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const trialInfo = user ? getTrialInfo(user.id) : null;
  const paymentStatus = user ? getPaymentStatus(user.id) : 'pending';

  useEffect(() => {
    if (user) {
      setPaypalLink(paymentStorage[user.id]?.paypalLink || '');
    }
  }, [user]);

  const handlePayPalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paypalLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter a PayPal link",
        variant: "destructive"
      });
      return;
    }

    if (!paypalLink.includes('paypal.com') && !paypalLink.includes('paypal.me')) {
      toast({
        title: "Error",
        description: "Please enter a valid PayPal link",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (user) {
        paymentStorage[user.id] = { paypalLink };
        toast({
          title: "Success",
          description: "PayPal link updated successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update PayPal link",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeAccount = async () => {
    if (!user) return;
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updatePaymentStatus(user.id, 'active');
      setProcessingPayment(false);
      toast({
        title: "Payment Successful!",
        description: "Your account has been upgraded to premium. Welcome!"
      });
      
      // Redirect back to dashboard after successful payment
      setTimeout(() => {
        navigate(`/${user.role}`);
      }, 2000);
    }, 3000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPaymentStatusBadge = () => {
    const variant = paymentStatus === 'active' ? 'default' : 
                   paymentStatus === 'expired' ? 'destructive' : 'secondary';
    const text = paymentStatus === 'active' ? 'Premium Active' : 
                 paymentStatus === 'expired' ? 'Payment Expired' : 'Free Trial';
    return <Badge variant={variant}>{text}</Badge>;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please log in to access payments.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalTrialDays = 14;
  const daysUsed = trialInfo ? totalTrialDays - trialInfo.daysRemaining : 0;
  const progressPercentage = (daysUsed / totalTrialDays) * 100;
  const needsUpgrade = trialInfo && !trialInfo.isTrialActive && paymentStatus !== 'active';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/${user.role}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Payments & Billing</h1>
            {getPaymentStatusBadge()}
          </div>
        </div>

        {/* Upgrade Prompt for Expired Trials */}
        {needsUpgrade && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Upgrade Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 mb-4">
                Your free trial has expired. Upgrade to premium to continue using all features.
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Premium Features:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Unlimited job postings</li>
                  <li>• Advanced contractor matching</li>
                  <li>• Priority customer support</li>
                  <li>• Detailed analytics and reporting</li>
                  <li>• Custom PayPal integration</li>
                </ul>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-green-600">$29.99/month</div>
                <Button 
                  onClick={handleUpgradeAccount}
                  disabled={processingPayment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {processingPayment ? 'Processing...' : 'Upgrade Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Success Message */}
        {paymentStatus === 'active' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Premium Account Active</span>
              </div>
              <p className="text-green-700 mt-2">
                Thank you for upgrading! You now have access to all premium features.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PayPal Form */}
          <Card>
            <CardHeader>
              <CardTitle>PayPal Payment Link</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentStatus === 'active' ? (
                <form onSubmit={handlePayPalUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="paypal-link">PayPal Link</Label>
                    <Input
                      id="paypal-link"
                      type="url"
                      placeholder="https://paypal.me/yourusername"
                      value={paypalLink}
                      onChange={(e) => setPaypalLink(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update PayPal Link'}
                  </Button>
                </form>
              ) : (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    PayPal integration is available with premium subscription.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Trial Status */}
          {trialInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Trial Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge variant={trialInfo.isTrialActive ? "default" : "secondary"}>
                    {trialInfo.isTrialActive ? 'Active Trial' : 'Trial Expired'}
                  </Badge>
                </div>
                
                {trialInfo.isTrialActive && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Days remaining:</span>
                        <span className="font-medium">{trialInfo.daysRemaining} of {totalTrialDays}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground">Started</p>
                          <p className="font-medium">{formatDate(trialInfo.trialStartDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p className="font-medium">{formatDate(trialInfo.trialEndDate)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {!trialInfo.isTrialActive && (
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Your trial expired on {formatDate(trialInfo.trialEndDate)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;