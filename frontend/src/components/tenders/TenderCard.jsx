import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, FileText, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TenderCard = ({ tender, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tender/${tender.id}`);
  };

  if (viewMode === 'list') {
    return (
      <Card className="card-shadow-hover transition-all">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <Badge className="bg-primary text-primary-foreground">{tender.status}</Badge>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Star className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                {tender.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{tender.organization}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{tender.publishedDate}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{tender.deadline}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{tender.location}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>{tender.budget}</span>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2">
              <Button onClick={handleViewDetails} className="w-full sm:w-auto">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow-hover transition-all h-full flex flex-col">
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <Badge className="bg-primary text-primary-foreground">{tender.status}</Badge>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Star className="h-4 w-4" />
          </button>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {tender.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{tender.organization}</p>

        <div className="space-y-2 text-sm flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{tender.publishedDate}</span>
            <Calendar className="h-3.5 w-3.5 text-muted-foreground ml-2" />
            <span className="text-muted-foreground text-xs">{tender.deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{tender.location}</span>
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground ml-2" />
            <span className="text-muted-foreground text-xs">{tender.budget}</span>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
            <a href="#" className="link-primary text-xs">
              {tender.procedureCode}
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-muted-foreground">#</span> {tender.description}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button onClick={handleViewDetails} variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TenderCard;