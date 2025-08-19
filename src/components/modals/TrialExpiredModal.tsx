import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrialExpiredModalProps {
  isOpen: boolean;
  onPaymentSuccess: () => void;
}

export const TrialExpiredModal: React.FC<TrialExpiredModalProps> = ({
  isOpen,
  onPaymentSuccess
}) => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate('/payments');
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Trial Period Ended
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Your 14-day free trial has expired. To continue using all features, 
            please upgrade to a paid plan.
          </p>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Premium Features Include:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Unlimited job postings</li>
              <li>• Advanced contractor matching</li>
              <li>• Priority customer support</li>
              <li>• Detailed analytics and reporting</li>
            </ul>
          </div>
          <Button 
            onClick={handleUpgradeClick}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Upgrade Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};