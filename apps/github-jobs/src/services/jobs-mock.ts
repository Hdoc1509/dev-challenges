import { parseJobs } from "../utils/jobs";
import jobsMock from "../mocks/jobs.json";
import type { JobService } from "./jobs";

export const getJobs: JobService = (query, options = {}) => {
  // NOTE: zip code will be omitted as it's not available in mock
  const { location, fullTime } = options;
  const jobs = parseJobs(jobsMock);

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query != null
        ? job.title.toLowerCase().includes(query.toLowerCase())
        : true;
    const locationMatch = ((location) => {
      if (location != null) {
        // NOTE: location coords will be omitted as it's not available in mock
        return typeof location === "string"
          ? job.location.match(new RegExp(location, "i")) != null
          : true;
      }

      return job.location.match(/new york|\sny/i) != null;
    })(location);
    const fullTimeMatch = fullTime === "on" ? job.isFullTime : true;

    return queryMatch && locationMatch && fullTimeMatch;
  });

  return Promise.resolve([null, filtered]);
};
