import { eventService } from "@/entities/event";
import { IEvent } from "../model";
import { useEffect, useState } from "react";

export const useEvents = (region: string, filters: string, page?: number) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setCount(0);
    eventService
      .getEvents(region, filters, page)
      .then(({ data }) => {
        setEvents(data.results);
        setCount(data.count);
        setTotalPages(Math.ceil(data.count / 20));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [page, region, filters]);

  return {
    events,
    count,
    isLoading,
    totalPages,
    isError,
  };
};
