import jobsResponse from "../mocks/jobs.json";

export type JobsResults = typeof jobsResponse.jobs_results;

export const getMockedJobs = () => {
  return jobsResponse.jobs_results;
};
