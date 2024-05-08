import { parseJobs } from "../utils/jobs";
import jobsMock from "../mocks/jobs.json";
import type { JobService } from "./jobs";

export const getJobs: JobService = (query, options = {}) => {
  // NOTE: zip code will be omitted here as it's not available in mock
  const { location } = options;
  const jobs = parseJobs(jobsMock);

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query != null
        ? job.title.toLowerCase().includes(query.toLowerCase())
        : true;
    const locationMatch =
      location != null
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : job.location.match(/new york|\sny/i) != null;

    return queryMatch && locationMatch;
  });

  return Promise.resolve([null, filtered]);
};
