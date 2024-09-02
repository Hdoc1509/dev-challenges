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

export type Location = {
  city: string;
  country: string;
};

export type SearchOptions = {
  location?: Location;
  guests?: number;
};

export type FnSearchOptions = (options?: SearchOptions) => Promise<void>;
