import { useState } from 'react';
import FilterChips from '../FilterChips';

export default function FilterChipsExample() {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="p-6">
      <FilterChips activeFilter={filter} onFilterChange={setFilter} />
      <p className="mt-4 text-sm text-muted-foreground">নির্বাচিত: {filter}</p>
    </div>
  );
}
