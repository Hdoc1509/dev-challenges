import jobsResponse from "../mocks/jobs.json";
import { parseJobs } from "../utils";

export type JobsResults = typeof jobsResponse.jobs_results;

export type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  id: string;
  createdAt: string;
  thumbnail: string;
  isFullTime: boolean;
};

export const getMockedJobs = (): Job[] => {
  return parseJobs(jobsResponse.jobs_results);
};
