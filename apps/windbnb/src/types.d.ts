// Generated with app.quicktype.io

export type Stay = {
  city: string;
  country: string;
  isSuperHost: boolean;
  title: string;
  rating: number;
  maxGuests: number;
  type: string;
  beds: number | null;
  imageUrl: string;
};

export type SearchOptions = {
  location?: {
    city: string;
    country: string;
  };
  guests?: number;
};
