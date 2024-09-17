import { ServiceError } from "@lib/fetcher";

export const JobsServiceError = new ServiceError("Jobs");

export class JobsEmptyResultsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobsEmptyResultsError";
  }
}

export const isJobsEmptyResultsError = (error: Error) =>
  error instanceof JobsEmptyResultsError;

export const isJobsEmptyResultsMessage = (message: string) =>
  message.includes("No jobs found");
