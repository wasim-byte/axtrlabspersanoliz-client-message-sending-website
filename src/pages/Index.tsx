import MessageCard from "@/components/MessageCard";
import FloatingShapes from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-foreground mb-4">
              aXtr labs
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-muted-foreground mb-4">
              Smart Project Messaging System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Internal tool for automated client communication. Enter client ID numbers to send automated messages through our system.
            </p>
            <Link to="/clients">
              <Button className="axtr-button" size="lg">
                <Users className="w-5 h-5 mr-2" />
                View All Clients
              </Button>
            </Link>
          </div>
        </div>

        {/* Message Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <MessageCard
            title="Pre-Call Email"
            description="Send automated pre-call preparation email to client"
            icon={<Mail className="w-8 h-8" />}
            messageType="precall"
          />
          
          <MessageCard
            title="Google Meet Invite"
            description="Schedule and send Google Meet invitation"
            icon={<Calendar className="w-8 h-8" />}
            messageType="googlemeet"
          />
          
          <MessageCard
            title="BRD Email"
            description="Send Business Requirement Document via email"
            icon={<FileText className="w-8 h-8" />}
            messageType="brd"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <div className="text-sm text-muted-foreground">
            <p>Webhook endpoint: <code className="bg-muted px-2 py-1 rounded text-xs">http://localhost:5678/webhook-test/157c77be-9e01-4abb-821e-ee1bd376a330</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
