import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { X, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export const TenderFilters = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    keywords: '',
    cpvCode: '',
    buyer: '',
    externalId: '',
    announcementType: '',
    location: '',
    status: '',
    publicationDateFrom: null,
    publicationDateTo: null,
    deadlineDateFrom: null,
    deadlineDateTo: null,
    activityDomain: '',
    sortBy: 'recently-published',
    budgetMin: '',
    budgetMax: '',
    currency: 'RON',
  });

  const handleReset = () => {
    setFilters({
      keywords: '',
      cpvCode: '',
      buyer: '',
      externalId: '',
      announcementType: '',
      location: '',
      status: '',
      publicationDateFrom: null,
      publicationDateTo: null,
      deadlineDateFrom: null,
      deadlineDateTo: null,
      activityDomain: '',
      sortBy: 'recently-published',
      budgetMin: '',
      budgetMax: '',
      currency: 'RON',
    });
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-card">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Keywords */}
          <div>
            <Label htmlFor="keywords" className="text-sm font-medium mb-2 block">
              Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="Add keywords to refine results for you"
              value={filters.keywords}
              onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Type keyword and press Enter (e.g. 'STARTED')
            </p>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cpv-code" className="text-sm font-medium mb-2 block">
                CPV Codes
              </Label>
              <Select value={filters.cpvCode} onValueChange={(value) => setFilters({ ...filters, cpvCode: value })}>
                <SelectTrigger id="cpv-code">
                  <SelectValue placeholder="Select CPV codes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All CPV Codes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="buyer" className="text-sm font-medium mb-2 block">
                Buyer
              </Label>
              <Select value={filters.buyer} onValueChange={(value) => setFilters({ ...filters, buyer: value })}>
                <SelectTrigger id="buyer">
                  <SelectValue placeholder="Select buyers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buyers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="external-id" className="text-sm font-medium mb-2 block">
                External Identifier
              </Label>
              <Input
                id="external-id"
                placeholder="e.g. T6847640"
                value={filters.externalId}
                onChange={(e) => setFilters({ ...filters, externalId: e.target.value })}
              />
            </div>
          </div>

          {/* Another Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="announcement-type" className="text-sm font-medium mb-2 block">
                Announcement Type
              </Label>
              <Select value={filters.announcementType} onValueChange={(value) => setFilters({ ...filters, announcementType: value })}>
                <SelectTrigger id="announcement-type">
                  <SelectValue placeholder="Select announcement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                Location
              </Label>
              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="e.g. Bucharest, Romania" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status" className="text-sm font-medium mb-2 block">
                Status
              </Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="started">Started</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Ranges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Publication Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.publicationDateFrom ? format(filters.publicationDateFrom, 'PP') : 'From'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.publicationDateFrom}
                      onSelect={(date) => setFilters({ ...filters, publicationDateFrom: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Deadline Date Range</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.deadlineDateFrom ? format(filters.deadlineDateFrom, 'PP') : 'From'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.deadlineDateFrom}
                      onSelect={(date) => setFilters({ ...filters, deadlineDateFrom: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="activity-domain" className="text-sm font-medium mb-2 block">
                Activity Domain
              </Label>
              <Select value={filters.activityDomain} onValueChange={(value) => setFilters({ ...filters, activityDomain: value })}>
                <SelectTrigger id="activity-domain">
                  <SelectValue placeholder="Search activity domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <Label htmlFor="sort-by" className="text-sm font-medium mb-2 block">
              Sort By
            </Label>
            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
              <SelectTrigger id="sort-by" className="w-full md:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently-published">Recently Published</SelectItem>
                <SelectItem value="deadline-asc">Deadline (Earliest)</SelectItem>
                <SelectItem value="deadline-desc">Deadline (Latest)</SelectItem>
                <SelectItem value="budget-asc">Budget (Low to High)</SelectItem>
                <SelectItem value="budget-desc">Budget (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Budget Range</Label>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="budget-min" className="text-xs text-muted-foreground mb-1 block">
                  Minimum
                </Label>
                <Input
                  id="budget-min"
                  type="number"
                  placeholder="€"
                  value={filters.budgetMin}
                  onChange={(e) => setFilters({ ...filters, budgetMin: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="budget-max" className="text-xs text-muted-foreground mb-1 block">
                  Maximum
                </Label>
                <Input
                  id="budget-max"
                  type="number"
                  placeholder="€"
                  value={filters.budgetMax}
                  onChange={(e) => setFilters({ ...filters, budgetMax: e.target.value })}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Currency: <span className="font-medium">{filters.currency}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Set budget limits to better customize
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex justify-end gap-3">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApply} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Apply Filters
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TenderFilters;