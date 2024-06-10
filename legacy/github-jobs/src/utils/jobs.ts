import { sanitizeString } from "./helpers";
import type { JobsResponse } from "../schemas/jobs";
import type { Job } from "../types";

export const parseJobs = (data: JobsResponse): Job[] => {
  return data.jobs_results!.map((job) => ({
    title: job.title,
    company: {
      name: job.company_name,
      url: job.related_links[0].link,
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

export const createJobLink = (job: Job) => {
  const { title, company, location } = job;

  const link = `${sanitizeString(title)}-${sanitizeString(
    company.name,
  )}-${sanitizeString(location)}`;

  return link.replace(/\s/g, "-");
};
