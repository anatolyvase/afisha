import { EventCard, EventCardSkeleton, useEvents } from "@/entities/event";
import { Pagination } from "@/shared/ui/pagination.tsx";
import { Filters } from "@/widgets/event-list/ui/filters.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function EventList() {
  const now = new Date().toISOString();
  const { region } = useParams<{ region: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(`?actual_since=${now}`);
  const { events, isLoading, totalPages, count } = useEvents(
    region || "msk",
    filters,
    currentPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [region]);

  return (
    <>
      <Filters totalCount={count} isLoading={isLoading} onChange={setFilters} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))
          : events.map(item => <EventCard key={item.id} {...item} />)}
      </div>
      <Pagination
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
