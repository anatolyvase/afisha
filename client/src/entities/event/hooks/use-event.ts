import { eventService } from "@/entities/event";
import { DetailedEvent } from "../model";
import { useEffect, useState } from "react";

export const useEvent = (id: string) => {
  const [data, setData] = useState<DetailedEvent>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    setIsLoading(true);

    eventService
      .getEvent(id)
      .then(({ data, status }) => {
        setData(data);
        setIsLoading(false);
        setStatus(status);
      })
      .catch(({ status }) => {
        setIsError(true);
        setIsLoading(false);
        setStatus(status);
      });
  }, [id]);

  return { data, isLoading, isError, status };
};
