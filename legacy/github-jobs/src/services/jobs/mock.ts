import { parseJobs } from "@/utils/jobs";
import { randomInt } from "@/utils/helpers";
import jobsMock from "@/mocks/jobs.json";
import type { PromiseWithError } from "@lib/fetcher";
import type { Job, Search } from "@/types";

const mockLocations = jobsMock.jobs_results.map(({ location }) => location);

export const getMockedJobs = (search: Search): PromiseWithError<Job[]> => {
  const { query, location, fullTime } = search;
  const jobs = parseJobs(jobsMock);
  const endIndexSlice = randomInt(7, 10);

  const isLocationInMocks = mockLocations.some((mockLocation) =>
    mockLocation.match(new RegExp(location, "i")),
  );

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query !== ""
        ? job.title.toLowerCase().includes(query.toLowerCase())
        : true;
    const locationMatch = isLocationInMocks
      ? job.location.match(new RegExp(location, "i")) != null
      : job.location.match(/new york|\sny/i) != null;

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
