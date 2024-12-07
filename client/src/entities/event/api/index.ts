import { GetEventsResponse } from "../model";
import { api } from "@/shared/api";

class EventService {
  async getEvents(region: string, filters: string, page?: number) {
    return api.get<GetEventsResponse>(`/events${filters}`, {
      params: {
        fields:
          "id,title,is_free,age_restriction,description,dates,images,location,place,price,categories",
        text_format: "text",
        location: region,
        page: page || 1,
        expand: "place",
      },
    });
  }
}

export const eventService = new EventService();
