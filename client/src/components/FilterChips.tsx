import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "সব নোট" },
  { id: "important", label: "গুরুত্বপূর্ণ" },
  { id: "audio", label: "অডিও সহ" },
  { id: "recent", label: "সাম্প্রতিক" },
];

export default function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" data-testid="filter-chips">
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 whitespace-nowrap hover-elevate"
          onClick={() => onFilterChange(filter.id)}
          data-testid={`chip-filter-${filter.id}`}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}
