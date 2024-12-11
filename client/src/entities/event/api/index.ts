import { api } from "@/shared/api";
import { DetailedEvent, GetEventsResponse } from "../model";

class EventService {
  async getEvents(region: string, filters: string, page?: number) {
    return api.get<GetEventsResponse>(`/events${filters}`, {
      params: {
        fields:
          "id,title,is_free,age_restriction,description,dates,images,location,place,price,categories,slug",
        text_format: "text",
        location: region,
        page: page || 1,
        expand: "place",
      },
    });
  }

  async getEvent(id: string) {
    return api.get<DetailedEvent>(`/events/${id}`, {
      params: {
        fields:
          "id,title,is_free,age_restriction,description,dates,images,location,place,price,categories,slug",
        text_format: "text",
        expand: "place",
      },
    });
  }
}

export const eventService = new EventService();
