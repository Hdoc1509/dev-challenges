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

export type RequiredSearchOptions = Required<SearchOptions>;
export type RequiredSearchLocation = RequiredSearchOptions["location"];

export type FnSearchOptions = (options?: SearchOptions) => Promise<void>;
