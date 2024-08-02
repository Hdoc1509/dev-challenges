import type { Job } from "@/types";
import type { JobsResponse } from "./schema";

export const parseJobs = (data: JobsResponse): Job[] => {
  return data.jobs_results.map((job) => ({
    applyOptions: job.apply_options,
    title: job.title,
    company: job.company_name,
    // NOTE: job location has extra spaces in it. You can check it in jobs mock
    location: job.location.trim(),
    description: job.description,
    id: job.job_id,
    createdAt: job.detected_extensions.posted_at,
    thumbnail: job.thumbnail,
    isFullTime: job.detected_extensions.schedule_type
      .toLowerCase()
      .includes("full-time"),
    scheduleType: job.detected_extensions.schedule_type,
  }));
};
