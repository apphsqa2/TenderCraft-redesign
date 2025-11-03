import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TenderGrid from '@/components/tenders/TenderGrid';
import TenderFilters from '@/components/tenders/TenderFilters';
import SearchBar from '@/components/tenders/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Star, Bell, Grid3x3, List, X, Sparkles, MessageSquare } from 'lucide-react';
import { tendersMockData } from '@/data/mockTenders';
import { cn } from '@/lib/utils';

export const DiscoverTenders = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recently-published');
  const [dateFilter, setDateFilter] = useState('Oct 30, 2025 - Oct 31, 2025');
  const [filteredTenders, setFilteredTenders] = useState(tendersMockData);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleApplyFilters = (filters) => {
    // Mock filter logic - in real app, this would filter based on criteria
    console.log('Applying filters:', filters);
    setSortBy(filters.sortBy);
    setIsFiltersOpen(false);
  };

  const handleClearDateFilter = () => {
    setDateFilter('');
  };

  const activeFiltersCount = dateFilter ? 1 : 0;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Sticky Header */}
        <div className="sticky-header border-b border-border">
          <div className="p-4 lg:p-6">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Discover Tenders</h1>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                <span className="mr-1">🌐</span> EN
              </Button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <SearchBar 
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search tenders by title, organization, location..."
              />
            </div>

            {/* Action Buttons & Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="gap-2 relative"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Watchlist</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Alert</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recently-published">Recently Published</SelectItem>
                    <SelectItem value="deadline-asc">Deadline (Earliest)</SelectItem>
                    <SelectItem value="deadline-desc">Deadline (Latest)</SelectItem>
                    <SelectItem value="budget-asc">Budget (Low to High)</SelectItem>
                    <SelectItem value="budget-desc">Budget (High to Low)</SelectItem>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View Mode Toggle */}
                <div className="flex gap-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Active Filters Chips */}
            {dateFilter && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <Badge variant="secondary" className="gap-2 pl-3 pr-2 py-1">
                  Published: {dateFilter}
                  <button 
                    onClick={handleClearDateFilter}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearDateFilter}
                  className="text-xs h-7"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Modal */}
        {isFiltersOpen && (
          <TenderFilters 
            onClose={() => setIsFiltersOpen(false)}
            onApply={handleApplyFilters}
          />
        )}

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredTenders.length}</span> results
              </p>
              {sortBy && (
                <p className="text-xs text-muted-foreground mt-1">
                  Sorted by: {sortBy.replace('-', ' ')}
                </p>
              )}
            </div>
          </div>

          {/* Tenders Grid */}
          <TenderGrid tenders={filteredTenders} viewMode={viewMode} />
        </div>
      </main>
      
      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40 pulse-glow"
        title="AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
      
      {/* AI Assistant Popup */}
      {isAIAssistantOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-card rounded-lg shadow-lg border border-border z-40 animate-in slide-in-from-bottom-5">
          <div className="bg-accent text-accent-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-semibold text-sm">AI Tender Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAIAssistantOpen(false)}
              className="hover:bg-white/20 rounded p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-foreground">
                  Hi! I'm your AI Tender Assistant. I can help you with:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Understanding tender requirements</li>
                  <li>Finding relevant opportunities</li>
                  <li>Deadline management</li>
                  <li>Document preparation tips</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverTenders;