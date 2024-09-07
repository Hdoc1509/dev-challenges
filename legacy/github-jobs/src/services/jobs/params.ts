type SharedParams = {
  q: string;
  next_page_token?: string;
  location: string;
};

export type JobsParams = {
  client: SharedParams & { full_time?: string };
  server: SharedParams & {
    api_key: string;
    engine: "google_jobs";
    // chips?: string;
  };
};
