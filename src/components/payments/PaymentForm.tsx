import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  onSubmit: (paypalLink: string) => void;
  initialLink?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, initialLink = '' }) => {
  const [paypalLink, setPaypalLink] = useState(initialLink);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paypalLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter a PayPal link",
        variant: "destructive"
      });
      return;
    }

    // Basic PayPal URL validation
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
      onSubmit(paypalLink);
      toast({
        title: "Success",
        description: "PayPal link updated successfully"
      });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>PayPal Payment Link</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
      </CardContent>
    </Card>
  );
};