import { JobsEmptyResultsError } from "@/errors";
import { parseJobs } from "./parse";
import { randomInt } from "@/utils/helpers";
import jobsMock from "@/mocks/jobs.json";
import type { Search } from "@/types";
import type { JobsServiceReturn } from "./client";

const mockLocations = jobsMock.jobs_results.map(({ location }) => location);

export const getMockedJobs = (search: Search): JobsServiceReturn => {
  const { query, location, fullTime, pageAsIndex = 0 } = search;
  const jobs = parseJobs(jobsMock.jobs_results);
  const endIndexSlice = randomInt(0, 10);

  const isLocationInMocks = mockLocations.some((mockLocation) =>
    mockLocation.match(new RegExp(location, "i")),
  );

  const filtered = jobs.filter((job) => {
    const queryMatch =
      query !== "" ? job.title.match(new RegExp(query, "i")) != null : true;
    // allow match "Forklift Operator" at line 222 in mocks/job.json
    const queryMatchForklift =
      query === "front" ? job.title.match(/front|fork/i) != null : true;
    const locationMatch = isLocationInMocks
      ? job.location.match(new RegExp(location, "i")) != null
      : true;
    // allow to match all jobs
    const locationMatchAny = location.match(/any/i) != null;

    const fullTimeMatch = fullTime ? job.isFullTime : true;

    return (
      (queryMatch || queryMatchForklift) &&
      (locationMatch || locationMatchAny) &&
      fullTimeMatch
    );
  });

  if (filtered.length === 0) {
    return Promise.resolve([
      new JobsEmptyResultsError(`No jobs found for: ${query}`),
    ]);
  }

  const sorted = filtered.sort(() => Math.random() - 0.5);
  const sliced = sorted.slice(0, endIndexSlice);

  if (sliced.length === 0) {
    return Promise.resolve([
      new JobsEmptyResultsError(`No jobs found for: ${query}`),
    ]);
  }

  return Promise.resolve([
    null,
    {
      jobs: sliced,
      nextPageToken: sliced.length < 10 ? undefined : `token-${pageAsIndex}`,
    },
  ]);
};
