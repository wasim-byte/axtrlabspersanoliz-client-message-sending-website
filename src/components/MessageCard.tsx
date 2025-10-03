import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MessageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  messageType: string;
}

const MessageCard = ({ title, description, icon, messageType }: MessageCardProps) => {
  const [clientId, setClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid client ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const message = generateClientMessage(messageType, clientId);
      
      const response = await fetch("http://localhost:5678/webhook-test/157c77be-9e01-4abb-821e-ee1bd376a330", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageType,
          clientId,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${title} sent successfully to client ${clientId}`,
        });
        setClientId("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateClientMessage = (type: string, id: string): string => {
    switch (type) {
      case "precall":
        return `Send pre-call email to client ID number ${id}`;
      case "googlemeet":
        return `Send Google Meet invite to client ID number ${id}`;
      case "brd":
        return `Send BRD (Business Requirement Document) to client ID number ${id}`;
      default:
        return `Send message to client ID number ${id}`;
    }
  };

  return (
    <Card className="axtr-card p-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`clientId-${messageType}`} className="text-sm font-medium">
              Client ID Number
            </Label>
            <Input
              id={`clientId-${messageType}`}
              type="text"
              placeholder="Enter client database ID..."
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="pulse-border"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="axtr-button w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : `Send ${title}`}
          </Button>
        </form>
      </div>
      
      {/* Floating background shape */}
      <div className="floating-shape top-4 right-4 w-16 h-16 bg-primary/5 rounded-full" />
    </Card>
  );
};

export default MessageCard;