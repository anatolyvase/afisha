import { SearchResponse } from "../model";
import { api } from "@/shared/api";

class SearchService {
  async search(q: string, location: string) {
    return api.get<SearchResponse>("/search", {
      params: {
        q,
        ctype: "event",
        location,
      },
    });
  }
}

export const searchService = new SearchService();
