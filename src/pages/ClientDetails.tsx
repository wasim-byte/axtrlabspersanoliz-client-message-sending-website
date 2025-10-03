import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, Building, Mail, Phone, Globe, FileText, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingShapes from "@/components/FloatingShapes";

interface Client {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  description: string;
  servicesNeeded: string[];
  companySummary: string;
}

const ClientDetails = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      console.log("Fetching clients from:", "http://localhost:3003/push-wasim-clients");
      
      const response = await fetch("http://localhost:3003/push-wasim-clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
        
        // Handle different response formats
        let clientsData = [];
        if (data.clients && Array.isArray(data.clients)) {
          clientsData = data.clients;
        } else if (Array.isArray(data)) {
          clientsData = data;
        } else if (data.json && data.json.clients) {
          clientsData = data.json.clients;
        }
        
        console.log("Processed clients data:", clientsData);
        setClients(clientsData);
        
        toast({
          title: "Success",
          description: `Loaded ${clientsData.length} clients from database`,
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error", 
        description: "Failed to load client data. Make sure your n8n workflow endpoint is running on localhost:3003",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <FloatingShapes />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingShapes />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="icon" className="axtr-button">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Client Database</h1>
            <p className="text-muted-foreground">Complete client information from MongoDB</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="axtr-card p-6">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{clients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clients</p>
              </div>
            </div>
          </Card>
          
          <Card className="axtr-card p-6">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clients.filter(c => c.company && c.company !== "N/A").length}
                </p>
                <p className="text-sm text-muted-foreground">With Companies</p>
              </div>
            </div>
          </Card>
          
          <Card className="axtr-card p-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clients.reduce((acc, c) => acc + (c.servicesNeeded?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Services Requested</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="axtr-card p-6 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      {client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ID: {client.id}
                    </p>
                    {client.referenceNumber !== "N/A" && (
                      <p className="text-sm text-muted-foreground">
                        Ref: {client.referenceNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href={`mailto:${client.email}`} className="text-foreground hover:text-primary transition-colors">
                      {client.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href={`tel:${client.phone}`} className="text-foreground hover:text-primary transition-colors">
                      {client.phone}
                    </a>
                  </div>
                  
                  {client.company && client.company !== "N/A" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{client.company}</span>
                    </div>
                  )}
                  
                  {client.website && client.website !== "N/A" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      <a 
                        href={client.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors truncate"
                      >
                        {client.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                {client.description && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Project Description</span>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                      {client.description}
                    </p>
                  </div>
                )}

                {/* Services Needed */}
                {client.servicesNeeded && client.servicesNeeded.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Services Needed</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {client.servicesNeeded.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Company Summary */}
                {client.companySummary && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Company Summary</span>
                    </div>
                    <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md line-clamp-4">
                      {client.companySummary}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Floating background shape */}
              <div className="floating-shape top-4 right-4 w-12 h-12 bg-primary/5 rounded-full" />
            </Card>
          ))}
        </div>

        {clients.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Clients Found</h3>
            <p className="text-muted-foreground mb-4">No client data available at the moment.</p>
            <Button onClick={fetchClients} className="axtr-button">
              Refresh Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;