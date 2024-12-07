import { IEvent } from "@/entities/event";
import { searchService } from "@/features/search-events/api";
import { useParams } from "react-router";

interface UseSearchOptions {
  onSuccess?: (data: IEvent[]) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

export const useSearch = (options?: UseSearchOptions) => {
  const { region } = useParams<{ region: string }>();

  const search = async (query: string) => {
    if (query.length < 2) {
      options?.onSuccess?.([]);
      return;
    }

    try {
      const response = await searchService.search(query, region || "msk");
      options?.onSuccess?.(response.data.results);
    } catch (error) {
      options?.onError?.(error);
    } finally {
      options?.onSettled?.();
    }
  };

  return {
    search,
  };
};
