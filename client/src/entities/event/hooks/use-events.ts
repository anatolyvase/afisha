import { eventService } from "@/entities/event";
import { IEvent } from "../model";
import { useEffect, useState } from "react";

export const useEvents = (page?: number) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    eventService
      .getEvents(page)
      .then(({ data }) => {
        setEvents(data.results);
        setTotalPages(Math.floor(data.count / 20));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [page]);

  return {
    events,
    isLoading,
    totalPages,
    isError,
  };
};
