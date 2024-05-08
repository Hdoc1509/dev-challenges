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

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
