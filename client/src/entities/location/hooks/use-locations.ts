import { ILocation, locationService } from "@/entities/location";
import { useEffect, useState } from "react";

export const useLocations = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    locationService
      .getLocations()
      .then(({ data }) => {
        setLocations(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return {
    locations,
    isLoading,
    isError,
  };
};
