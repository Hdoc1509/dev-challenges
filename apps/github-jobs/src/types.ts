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

export type SearchOptions = {
  fullTime?: "on";
  location?: string;
  zipCode?: number;
};

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
