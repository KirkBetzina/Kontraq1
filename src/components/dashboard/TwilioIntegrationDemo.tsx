import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTwilio } from '@/hooks/useTwilio';
import { toast } from '@/components/ui/use-toast';

/**
 * Twilio Integration Demo Component
 * 
 * This component demonstrates the Twilio integration capabilities:
 * - Sending SMS messages
 * - Making voice calls
 */
const TwilioIntegrationDemo: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const { loading, sendMessage, initiateCall } = useTwilio();

  const handleSendSMS = async () => {
    if (!phoneNumber || !message) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both phone number and message',
        variant: 'destructive'
      });
      return;
    }

    try {
      await sendMessage({
        to: phoneNumber,
        body: message
      });

      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
      
      // Clear message after sending
      setMessage('');
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    }
  };

  const handleMakeCall = async () => {
    if (!phoneNumber) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a phone number',
        variant: 'destructive'
      });
      return;
    }

    try {
      await initiateCall({
        to: phoneNumber,
        twiml: `<Response><Say>This is a test call from the contractor management system.</Say></Response>`
      });

      toast({
        title: 'Success',
        description: 'Call initiated successfully',
      });
    } catch (error) {
      console.error('Error making call:', error);
      toast({
        title: 'Error',
        description: 'Failed to initiate call',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Twilio Integration</CardTitle>
        <CardDescription>
          Send messages or make calls to contractors and subcontractors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sms">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sms">Send SMS</TabsTrigger>
            <TabsTrigger value="call">Make Call</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <TabsContent value="sms" className="space-y-4 mt-0">
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
                onClick={handleSendSMS} 
                disabled={loading || !phoneNumber || !message}
                className="w-full"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </TabsContent>
            
            <TabsContent value="call" className="space-y-4 mt-0">
              <p className="text-sm text-gray-500">
                This will initiate a voice call to the specified phone number with a pre-recorded message.
              </p>
              <Button 
                onClick={handleMakeCall} 
                disabled={loading || !phoneNumber}
                className="w-full"
              >
                {loading ? 'Initiating...' : 'Make Call'}
              </Button>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TwilioIntegrationDemo;
