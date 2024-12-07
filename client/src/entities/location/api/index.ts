import { ILocation } from "@/entities/location";
import { api } from "@/shared/api";

class LocationService {
  async getLocations() {
    return api.get<ILocation[]>("/locations");
  }
}

export const locationService = new LocationService();
