export type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  id: string;
  createdAt?: string;
  thumbnail?: string;
  isFullTime: boolean;
};

export type LocationCoords = {
  latitude: number;
  longitude: number;
}

export type SearchOptions = {
  fullTime?: "on";
  location?: LocationCoords | string;
  zipCode?: number;
};

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
