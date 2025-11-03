import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, FileText, Star, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const getUrgencyStatus = (deadline) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDeadline < 0) return { status: 'EXPIRED', variant: 'destructive', label: 'Expired' };
  if (daysUntilDeadline <= 3) return { status: 'URGENT', variant: 'urgent', label: 'Urgent' };
  if (daysUntilDeadline <= 7) return { status: 'CLOSING_SOON', variant: 'closing-soon', label: 'Closing Soon' };
  return { status: 'ACTIVE', variant: 'default', label: 'Active' };
};

const isNew = (publishedDate) => {
  const published = new Date(publishedDate);
  const now = new Date();
  const daysSincePublished = Math.ceil((now - published) / (1000 * 60 * 60 * 24));
  return daysSincePublished <= 2;
};

const formatDeadlineCountdown = (deadline) => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDeadline < 0) return 'Expired';
  if (daysUntilDeadline === 0) return 'Today';
  if (daysUntilDeadline === 1) return '1 day left';
  return `${daysUntilDeadline} days left`;
};

export const TenderCard = ({ tender, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const urgency = getUrgencyStatus(tender.deadline);
  const isNewTender = isNew(tender.publishedDate);

  const handleViewDetails = () => {
    navigate(`/tender/${tender.id}`);
  };

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  if (viewMode === 'list') {
    return (
      <Card className="card-shadow-hover transition-all cursor-pointer" onClick={handleViewDetails}>
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    className={cn(
                      urgency.variant === 'urgent' && 'badge-urgent',
                      urgency.variant === 'closing-soon' && 'badge-closing-soon',
                      urgency.variant === 'default' && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {urgency.label}
                  </Badge>
                  {isNewTender && (
                    <Badge className="badge-new">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <button 
                  onClick={handleBookmarkToggle}
                  className="text-muted-foreground hover:text-warning transition-colors"
                >
                  <Star className={cn('h-5 w-5', isBookmarked && 'fill-warning text-warning')} />
                </button>
              </div>
              
              <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                {tender.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{tender.organization}</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-medium text-foreground">{formatDeadlineCountdown(tender.deadline)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">{tender.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{tender.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Published</p>
                    <p className="font-medium text-foreground">{tender.publishedDate.split(',')[0]}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {tender.procedureCode} • {tender.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex sm:flex-col items-center justify-end gap-2">
              <Button className="w-full sm:w-auto">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow-hover transition-all h-full flex flex-col cursor-pointer group" onClick={handleViewDetails}>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge 
              className={cn(
                urgency.variant === 'urgent' && 'badge-urgent',
                urgency.variant === 'closing-soon' && 'badge-closing-soon',
                urgency.variant === 'default' && 'bg-primary text-primary-foreground'
              )}
            >
              {urgency.label}
            </Badge>
            {isNewTender && (
              <Badge className="badge-new">
                <TrendingUp className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
          </div>
          <button 
            onClick={handleBookmarkToggle}
            className="text-muted-foreground hover:text-warning transition-colors"
          >
            <Star className={cn('h-5 w-5', isBookmarked && 'fill-warning text-warning')} />
          </button>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
          {tender.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{tender.organization}</p>

        {/* Deadline Countdown - Prominent */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Deadline</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{formatDeadlineCountdown(tender.deadline)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{tender.deadline}</p>
        </div>

        <div className="space-y-2.5 text-sm flex-1">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-success" />
            <span className="font-medium text-foreground">{tender.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">{tender.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">{tender.publishedDate.split(',')[0]}</span>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
            <a href="#" className="link-primary text-xs" onClick={(e) => e.stopPropagation()}>
              {tender.procedureCode}
            </a>
          </div>
          <div className="text-xs text-muted-foreground line-clamp-2 pt-2 border-t border-border">
            {tender.description}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenderCard;