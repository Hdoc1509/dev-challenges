import type { JobsResults, Job } from "./services/jobs";

export const parseJobs = (results: JobsResults): Job[] => {
  return results.map((job) => ({
    title: job.title,
    company: job.company_name,
    location: job.location,
    description: job.description,
    id: job.job_id,
    createdAt: job.detected_extensions.posted_at ?? "Unknown date",
    thumbnail: job.thumbnail ?? "Not found",
    isFullTime:
      job.detected_extensions.schedule_type.toLowerCase() === "full-time",
    scheduleType: job.detected_extensions.schedule_type,
  }));
};
