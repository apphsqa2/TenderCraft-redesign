import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TenderGrid from '@/components/tenders/TenderGrid';
import TenderFilters from '@/components/tenders/TenderFilters';
import SearchBar from '@/components/tenders/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Star, Bell, Grid3x3, List, X } from 'lucide-react';
import { tendersMockData } from '@/data/mockTenders';

export const DiscoverTenders = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Oct 30, 2025 - Oct 31, 2025');
  const [filteredTenders, setFilteredTenders] = useState(tendersMockData);

  const handleApplyFilters = (filters) => {
    // Mock filter logic - in real app, this would filter based on criteria
    console.log('Applying filters:', filters);
    setIsFiltersOpen(false);
  };

  const handleClearDateFilter = () => {
    setDateFilter('');
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Discover Tenders</h1>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              <span className="mr-1">🌐</span> EN
            </Button>
          </div>

          {/* Search and Actions */}
          <div className="bg-card rounded-lg p-6 mb-6 card-shadow">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <SearchBar 
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search tenders"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  Watchlist
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Create Alert
                </Button>
              </div>
            </div>
            
            {/* Active Filters */}
            {dateFilter && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  Published: {dateFilter}
                  <button 
                    onClick={handleClearDateFilter}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>

          {/* Filters Modal */}
          {isFiltersOpen && (
            <TenderFilters 
              onClose={() => setIsFiltersOpen(false)}
              onApply={handleApplyFilters}
            />
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTenders.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">List</span>
              </Button>
            </div>
          </div>

          {/* Tenders Grid */}
          <TenderGrid tenders={filteredTenders} viewMode={viewMode} />
        </div>
      </main>
    </div>
  );
};

export default DiscoverTenders;