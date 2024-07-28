import type { Job } from "@/types";
import type { JobsResponse } from "./schema";

export const parseJobs = (data: JobsResponse): Job[] => {
  return data.jobs_results.map((job) => ({
    // TODO: use Goggle Jobs Listing API to get job url instead of company.url
    // https://serpapi.com/google-jobs-listing-api
    // mock jobs-listing.json is based on first result from jobs-update-no-chips.json
    title: job.title,
    company: {
      name: job.company_name,
      url: job.company_name,
    },
    // NOTE: job location has extra spaces in it. You can check it in jobs mock
    location: job.location.trim(),
    description: job.description,
    id: job.job_id,
    createdAt: job.detected_extensions.posted_at,
    thumbnail: job.thumbnail,
    isFullTime:
      job.detected_extensions.schedule_type.toLowerCase() === "full-time",
    scheduleType: job.detected_extensions.schedule_type,
  }));
};
