import { parseJobs } from "../utils/jobs";
import jobsMock from "../mocks/jobs.json";
import type { JobService } from "./jobs";

const mockLocations = jobsMock.jobs_results.map(({ location }) => location);

export const getJobs: JobService = (query, options = {}) => {
  const { location, fullTime } = options;
  const jobs = parseJobs(jobsMock);

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query != null
        ? job.title.toLowerCase().includes(query.toLowerCase())
        : true;
    const locationMatch = ((location) => {
      if (location != null) {
        const isLocationInMocks = mockLocations.some((mockLocation) =>
          mockLocation.match(new RegExp(location, "i")),
        );

        return isLocationInMocks
          ? job.location.match(new RegExp(location, "i")) != null
          : job.location.match(/new york|\sny/i) != null;
      }

      return job.location.match(/new york|\sny/i) != null;
    })(location);
    const fullTimeMatch = fullTime === "on" ? job.isFullTime : true;

    return queryMatch && locationMatch && fullTimeMatch;
  });

  return Promise.resolve([null, filtered]);
};