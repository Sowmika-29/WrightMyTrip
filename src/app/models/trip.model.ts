export interface TripDuration {
  type: string;
  price: number;
}

export interface TripServices {
  hotel: string;
  food: string[];
  transport: string;
  guide: string;
}

export interface ItineraryDay {
  day: string;
  details: string;
}

export interface Trip {
  id: string;
  name: string;
  type: 'domestic' | 'international';
  image: string;
  tagline: string;
  description: string;
  durations: TripDuration[];
  services: TripServices;
  itinerary: ItineraryDay[];
  categories: string[];
  durationDays: number;
}
