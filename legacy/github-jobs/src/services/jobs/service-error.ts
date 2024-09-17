import { ServiceError } from "@lib/fetcher";

export const JOBS_EMPTY_RESULTS = {
  MESSAGE_PREFIX: "No jobs found for",
  STATE: "Fully empty",
};

export const JobsServiceError = new ServiceError("Jobs");

export class JobsEmptyResultsError extends Error {
  constructor({ query }: { query: string }) {
    super(`${JOBS_EMPTY_RESULTS.MESSAGE_PREFIX}: ${query}`);
    this.name = "JobsEmptyResultsError";
  }
}

export const isJobsEmptyResultsError = (error: Error) =>
  error instanceof JobsEmptyResultsError;

export const isJobsEmptyResultsMessage = (message: string) =>
  message.includes(JOBS_EMPTY_RESULTS.MESSAGE_PREFIX);
