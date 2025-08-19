import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { sendSMS } from '@/lib/twilio';
import { toast } from '@/components/ui/use-toast';

interface TwilioMessagingProps {
  recipientPhone?: string;
  onMessageSent?: () => void;
}

const TwilioMessaging: React.FC<TwilioMessagingProps> = ({ 
  recipientPhone = '',
  onMessageSent 
}) => {
  const [phoneNumber, setPhoneNumber] = useState(recipientPhone);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!phoneNumber || !message) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both phone number and message',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSending(true);
      await sendSMS({
        to: phoneNumber,
        body: message
      });

      toast({
        title: 'Message Sent',
        description: 'Your message has been sent successfully',
      });

      setMessage('');
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Message Failed',
        description: 'There was an error sending your message',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Recipient Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        <Button 
          onClick={handleSendMessage} 
          disabled={isSending || !phoneNumber || !message}
          className="w-full"
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TwilioMessaging;
