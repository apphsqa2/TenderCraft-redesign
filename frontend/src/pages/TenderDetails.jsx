import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2, MoreVertical, Calendar, MapPin, DollarSign, FileText, Sparkles } from 'lucide-react';
import { tendersMockData } from '@/data/mockTenders';
import AIAssistantWidget from '@/components/tenders/AIAssistantWidget';

export const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock tender data - in real app, fetch by ID
  const tender = tendersMockData[0];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Tender Details</h1>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              <span className="mr-1">🌐</span> EN
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6 card-shadow mb-6">
                {/* Tender Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-primary text-primary-foreground">STARTED</Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                      <span className="ml-2">Share</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {tender.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {tender.organization}
                </p>

                {/* Tender Meta Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Published:</span>
                    <span className="text-foreground font-medium">{tender.publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="text-foreground font-medium">{tender.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{tender.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{tender.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm col-span-full">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="link-primary text-sm">
                      {tender.procedureCode}
                    </a>
                  </div>
                  <div className="text-sm col-span-full">
                    <span className="text-muted-foreground">#</span>
                    <span className="text-foreground ml-1">{tender.description}</span>
                  </div>
                </div>

                {/* AI Insights Banner */}
                <div className="bg-accent-light border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Instant AI Insights</h3>
                        <p className="text-sm text-muted-foreground">
                          Our AI scans the tender in real-time, highlighting key requirements, risks, and must-know details while building your searchable knowledge base.
                        </p>
                      </div>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze now
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger 
                      value="overview" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Documents
                    </TabsTrigger>
                    <TabsTrigger 
                      value="buyer-info"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Buyer Info
                    </TabsTrigger>
                    <TabsTrigger 
                      value="summary"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Tender Summary
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Obiectivul licitatiei a-l achiziția și comanda sistemelor de iluminare publică în municipiul comunitate Baciu - Numele de aparate de luminat LED – 100 buc - Numărul de puncte luminoase disponibile prin intermediul unei lame de montaj din într-o cleme de strangere informații relevante și instalatiile de montare de stâlp si cu clematele de prindere ce stații devant-se și reglarea adnexată a luminii publice cu rutilă de conexiuni si conexiuni ai CCD – Implementarea unui sistem de telemanagement la nivel de punct de aprindere - Verificari si masuratori electrice, mecanice si luminotehnice pentru corespundenta pe datele de proiectul de executie Punere in functiune a instalatiilor si echipamentelor nou montate.
                      </p>
                    </div>

                    {/* Award Criteria */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Award Criteria - Cel mai bun raport calitate - pret
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-sm hover:no-underline">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                                1
                              </div>
                              <span>Pretul ofertei</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pl-8">
                            Details about pricing criteria and evaluation methodology.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="text-sm hover:no-underline">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                                2
                              </div>
                              <span>Durata de executie</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pl-8">
                            Details about execution timeline requirements and scoring.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="text-sm hover:no-underline">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                                4
                              </div>
                              <span>Asigurarile de carbon pentru aparatul de iluminat ofertat</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pl-8">
                            Details about carbon assurance requirements for lighting equipment.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger className="text-sm hover:no-underline">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                                3
                              </div>
                              <span>Durata de garantie acordata de catre constructori lucrurilor executate</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pl-8">
                            Details about warranty duration requirements from contractors.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="mt-6">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No documents available</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="buyer-info" className="mt-6">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Buyer information will be displayed here</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="summary" className="mt-6">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Tender summary will be displayed here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar - AI Assistant */}
            <div className="lg:col-span-1">
              <AIAssistantWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenderDetails;