import { parseJobs } from "../utils/jobs";
import jobsMock from "../mocks/jobs.json";
import type { JobService } from "./jobs";

export const getJobs: JobService = (query, options = {}) => {
  // NOTE: zip code will be omitted here as it's not available in mock
  const { location } = options;

  const jobs = parseJobs(jobsMock);
  const filtered = jobs.filter((job) => {
    let match = false;

    if (location != null) {
      match = job.location.toLowerCase().includes(location.toLowerCase());
    } else {
      match = job.location.match(/new york|\sny/i) != null;
    }

    if (query != null)
      match = job.title.toLowerCase().includes(query.toLowerCase());

    return match;
  });

  return Promise.resolve([null, filtered]);
};
