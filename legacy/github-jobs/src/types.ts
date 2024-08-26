import type { LocationCoords } from "@lib/geolocation";

export type ApplyOption = {
  title: string;
  link: string;
};

export type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  id: string;
  createdAt?: string;
  thumbnail?: string;
  isFullTime: boolean;
  applyOptions: ApplyOption[];
};

export type Search = {
  query: string;
  location: string;
  fullTime?: boolean;
  pageAsIndex?: number;
  nextPageToken?: string;
};

export type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export type SetOptional<BaseType, Keys extends keyof BaseType> = Omit<
  BaseType,
  Keys
> &
  Partial<Pick<BaseType, Keys>>;
