import { sanitizeString } from "./helpers";
import type { Job } from "../types";

export const createJobLink = (job: Job) => {
  const { title, company, location } = job;

  const link = `${sanitizeString(title)}-${sanitizeString(
    company,
  )}-${sanitizeString(location)}`;

  return link.replace(/\s/g, "-");
};
