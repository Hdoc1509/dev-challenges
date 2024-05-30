import { parseJobs } from "@/utils/jobs";
import jobsMock from "@/mocks/jobs.json";
import { randomInt } from "@/utils/number";
import type { JobService } from "./types";

const mockLocations = jobsMock.jobs_results.map(({ location }) => location);

export const getMockedJobs: JobService = (query, options = {}) => {
  const { location, fullTime } = options;
  const jobs = parseJobs(jobsMock);
  const endIndexSlice = randomInt(7, 10);

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query !== ""
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
    const fullTimeMatch = fullTime ? job.isFullTime : true;

    return queryMatch && locationMatch && fullTimeMatch;
  });

  if (filtered.length === 0) {
    return Promise.resolve([new Error(`No jobs found for: ${query}`)]);
  }

  const sorted = filtered.sort(() => Math.random() - 0.5);
  const sliced = sorted.slice(0, endIndexSlice);

  return Promise.resolve([null, sliced]);
};
