import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock } from 'lucide-react';

interface TrialStatusProps {
  trialStartDate: Date;
  trialEndDate: Date;
  isTrialActive: boolean;
  daysRemaining: number;
}

export const TrialStatus: React.FC<TrialStatusProps> = ({
  trialStartDate,
  trialEndDate,
  isTrialActive,
  daysRemaining
}) => {
  const totalTrialDays = 14;
  const daysUsed = totalTrialDays - daysRemaining;
  const progressPercentage = (daysUsed / totalTrialDays) * 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
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
          <Badge variant={isTrialActive ? "default" : "secondary"}>
            {isTrialActive ? 'Active Trial' : 'Trial Expired'}
          </Badge>
        </div>
        
        {isTrialActive && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Days remaining:</span>
                <span className="font-medium">{daysRemaining} of {totalTrialDays}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-muted-foreground">Started</p>
                  <p className="font-medium">{formatDate(trialStartDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-muted-foreground">Expires</p>
                  <p className="font-medium">{formatDate(trialEndDate)}</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {!isTrialActive && (
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Your trial expired on {formatDate(trialEndDate)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};