export type Job = {
  title: string;
  company: {
    name: string;
    url: string;
  };
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
};

export type Search = {
  query: string;
  location: string;
  fullTime?: boolean;
  page?: number;
};

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
