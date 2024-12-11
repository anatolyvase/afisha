export interface IEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  dates: EventDate[];
  categories: string[];
  location: {
    slug: string;
  };
  place?: {
    id: number;
    title: string;
    slug: string;
    address: string;
    phone: string;
    is_stub: boolean;
    site_url: string;
    coords: {
      lat: number;
      lon: number;
    };
    subway: string;
    is_closed: number;
    location: string;
  };
  images: EventImage[];
  is_free: boolean;
  age_restriction: number;
}

export interface DetailedEvent extends IEvent {
  body_text: string;
}

export type EventDate = {
  start: number;
  end: number;
};

export type EventImage = {
  image: string;
  source: {
    name: string;
    link: string;
  };
};

export type GetEventsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IEvent[];
};
