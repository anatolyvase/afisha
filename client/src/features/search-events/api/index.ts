import { GetEventsResponse } from "@/entities/event";
import { api } from "@/shared/api";

class SearchService {
  async search(q: string, location: string) {
    return api.get<GetEventsResponse>("/search", {
      params: {
        q,
        ctype: "event",
        location,
      },
    });
  }
}

export const searchService = new SearchService();
