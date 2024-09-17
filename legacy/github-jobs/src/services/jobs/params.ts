type SharedParams = {
  q: string;
  next_page_token?: string;
  location: string;
};

export type JobsParams = {
  client: SharedParams & { full_time?: string };
  server: SharedParams & {
    api_key: string;
    engine: typeof GET_JOBS_PARAMS.ENGINE;
  };
};

export const GET_JOBS_PARAMS = Object.freeze({
  ENGINE: "google_jobs",
});
