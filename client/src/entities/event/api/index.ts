import { GetEventsResponse } from "../model";
import { api } from "@/shared/api";

class EventService {
  async getEvents(page?: number) {
    return api.get<GetEventsResponse>("/events", {
      params: {
        fields:
          "id,title,is_free,age_restriction,description,dates,images,location,place,price",
        text_format: "text",
        page: page || 1,
        expand: "place",
        actual_since: new Date().toISOString(),
      },
    });
  }
}

export const eventService = new EventService();
