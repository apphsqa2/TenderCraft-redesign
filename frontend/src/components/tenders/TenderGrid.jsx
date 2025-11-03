import TenderCard from './TenderCard';
import { cn } from '@/lib/utils';

export const TenderGrid = ({ tenders, viewMode = 'grid' }) => {
  return (
    <div
      className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      )}
    >
      {tenders.map((tender) => (
        <TenderCard key={tender.id} tender={tender} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default TenderGrid;