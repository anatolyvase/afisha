import { EventCard, EventCardSkeleton, useEvents } from "@/entities/event";
import { Pagination } from "@/shared/ui/pagination.tsx";
import { useState } from "react";

export function EventList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { events, isLoading, totalPages } = useEvents(currentPage);

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        {!isLoading &&
          events.map(item => <EventCard key={item.id} {...item} />)}
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
