import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send } from 'lucide-react';

export const AIAssistantWidget = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Card className="sticky top-6 card-shadow">
      <CardHeader className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">AI Tender Assistant</h3>
            <p className="text-xs text-muted-foreground">TENDER EXPERT</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI assistant can help with tender requirements, deadlines, and submission tips.
          </p>
        </div>
        <div className="space-y-3">
          <Textarea
            placeholder="Ask about this tender..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none"
            rows={4}
          />
          <Button 
            onClick={handleSend} 
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;