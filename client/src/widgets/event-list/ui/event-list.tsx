import { EventCard, EventCardSkeleton, useEvents } from "@/entities/event";
import { FilterEvents } from "@/features/filter-events";
import { Pagination } from "@/shared/ui/pagination.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function EventList() {
  const now = new Date();
  const { region } = useParams<{ region: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(`?actual_since=${now.toISOString()}`);
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
      <FilterEvents
        totalCount={count}
        initialDate={now}
        isLoading={isLoading}
        onChange={setFilters}
      />
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
