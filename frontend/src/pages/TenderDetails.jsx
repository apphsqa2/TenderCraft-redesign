import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2, Bookmark, Calendar, MapPin, DollarSign, FileText, Sparkles, Clock, Building, ArrowLeft, Download, ExternalLink, CheckCircle2, AlertCircle, Maximize2, Minimize2, Send } from 'lucide-react';
import { tendersMockData } from '@/data/mockTenders';
import { cn } from '@/lib/utils';

const formatDeadlineCountdown = (deadline) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDeadline < 0) return { text: 'Expired', urgent: true };
  if (daysUntilDeadline === 0) return { text: 'Today', urgent: true };
  if (daysUntilDeadline === 1) return { text: '1 day left', urgent: true };
  if (daysUntilDeadline <= 7) return { text: `${daysUntilDeadline} days left`, urgent: true };
  return { text: `${daysUntilDeadline} days left`, urgent: false };
};

export const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  
  // Mock tender data - in real app, fetch by ID
  const tender = tendersMockData[0];
  const countdown = formatDeadlineCountdown(tender.deadline);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Breadcrumb Navigation */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Discover Tenders
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <div className="bg-card rounded-lg p-6 card-shadow">
                {/* Status and Actions */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">STARTED</Badge>
                    {countdown.urgent && (
                      <Badge className="badge-urgent">
                        <Clock className="h-3 w-3 mr-1" />
                        {countdown.text}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={cn(isBookmarked && 'border-warning text-warning')}
                    >
                      <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-warning')} />
                      <span className="ml-2 hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>

                {/* Title and Organization */}
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {tender.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Building className="h-4 w-4" />
                  <p className="text-base">{tender.organization}</p>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-base font-semibold text-foreground">{tender.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-base font-semibold text-foreground">{tender.deadline}</p>
                      <p className="text-xs text-warning font-medium">{countdown.text}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-base font-semibold text-foreground">{tender.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Published</p>
                      <p className="text-base font-semibold text-foreground">{tender.publishedDate.split(',')[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Procedure Code */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="link-primary">
                    {tender.procedureCode}
                  </a>
                </div>
              </div>

              {/* AI Insights Banner */}
              <div className="bg-gradient-to-r from-accent-light to-accent-light/50 border-2 border-accent/30 rounded-lg p-5 card-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Instant AI Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Get AI-powered analysis of requirements, risks, and key details in seconds.
                      </p>
                    </div>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze now
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-card rounded-lg card-shadow">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-border px-6">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                      <TabsTrigger 
                        value="overview" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger 
                        value="requirements"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                      >
                        Requirements
                      </TabsTrigger>
                      <TabsTrigger 
                        value="documents"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                      >
                        Documents
                      </TabsTrigger>
                      <TabsTrigger 
                        value="buyer-info"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                      >
                        Buyer Info
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="p-6">
                    <TabsContent value="overview" className="mt-0">
                      {/* Description */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-foreground mb-4">Description</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Obiectivul licitatiei a-l achiziția și comanda sistemelor de iluminare publică în municipiul comunitate Baciu - Numele de aparate de luminat LED – 100 buc - Numărul de puncte luminoase disponibile prin intermediul unei lame de montaj din într-o cleme de strangere informații relevante și instalatiile de montare de stâlp si cu clematele de prindere ce stații devant-se și reglarea adnexată a luminii publice cu rutilă de conexiuni si conexiuni ai CCD – Implementarea unui sistem de telemanagement la nivel de punct de aprindere - Verificari si masuratori electrice, mecanice si luminotehnice pentru corespundenta pe datele de proiectul de executie Punere in functiune a instalatiilor si echipamentelor nou montate.
                        </p>
                      </div>

                      {/* Award Criteria */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          Award Criteria - Cel mai bun raport calitate - pret
                        </h3>
                        <Accordion type="single" collapsible className="w-full space-y-2">
                          <AccordionItem value="item-1" className="border border-border rounded-lg px-4">
                            <AccordionTrigger className="text-sm hover:no-underline py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                                  1
                                </div>
                                <span className="font-semibold">Prețul ofertei</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground pl-11 pb-4">
                              Details about pricing criteria and evaluation methodology.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2" className="border border-border rounded-lg px-4">
                            <AccordionTrigger className="text-sm hover:no-underline py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                                  2
                                </div>
                                <span className="font-semibold">Durata de executie</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground pl-11 pb-4">
                              Details about execution timeline requirements and scoring.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3" className="border border-border rounded-lg px-4">
                            <AccordionTrigger className="text-sm hover:no-underline py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                                  3
                                </div>
                                <span className="font-semibold">Durata de garantie acordata</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground pl-11 pb-4">
                              Details about warranty duration requirements from contractors.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-4" className="border border-border rounded-lg px-4">
                            <AccordionTrigger className="text-sm hover:no-underline py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                                  4
                                </div>
                                <span className="font-semibold">Asigurarile de carbon pentru aparatul de iluminat</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground pl-11 pb-4">
                              Details about carbon assurance requirements for lighting equipment.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </TabsContent>

                    <TabsContent value="requirements" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground mb-4">Key Requirements</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">LED Lighting Systems</p>
                              <p className="text-sm text-muted-foreground">100 LED luminaire units required</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Telemanagement System</p>
                              <p className="text-sm text-muted-foreground">Remote control and monitoring capability</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-info mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">Installation & Testing</p>
                              <p className="text-sm text-muted-foreground">Complete electrical, mechanical and photometric verification</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="mt-0">
                      <div className="text-center py-12">
                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-semibold text-foreground mb-2">No documents available</p>
                        <p className="text-sm text-muted-foreground">Documents will appear here when uploaded by the tender issuer.</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="buyer-info" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground mb-4">Buyer Information</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Organization</p>
                            <p className="font-semibold text-foreground">{tender.organization}</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Location</p>
                            <p className="font-semibold text-foreground">{tender.location}</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Contact Information</p>
                            <p className="text-sm text-muted-foreground">Contact details available after registration</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar - Quick Actions & Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Quick Actions Card */}
                <div className="bg-card rounded-lg p-5 card-shadow">
                  <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download All Docs
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="bg-card rounded-lg p-5 card-shadow">
                  <h3 className="font-bold text-foreground mb-4">Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-border my-1" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-semibold text-foreground">Published</p>
                        <p className="text-xs text-muted-foreground">{tender.publishedDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Deadline</p>
                        <p className="text-xs text-muted-foreground">{tender.deadline}</p>
                        <p className="text-xs text-warning font-medium mt-1">{countdown.text}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Tenders */}
                <div className="bg-card rounded-lg p-5 card-shadow">
                  <h3 className="font-bold text-foreground mb-4">Related Tenders</h3>
                  <div className="space-y-3">
                    {tendersMockData.slice(1, 4).map((relatedTender) => (
                      <button
                        key={relatedTender.id}
                        onClick={() => navigate(`/tender/${relatedTender.id}`)}
                        className="w-full text-left p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        <p className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                          {relatedTender.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{relatedTender.location}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenderDetails;