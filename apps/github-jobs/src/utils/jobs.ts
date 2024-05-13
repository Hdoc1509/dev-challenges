import { searchLocation } from "../services/geolocation";
import { getCurrentCoords } from "./geolocation";
import { sanitizeString } from "./string";
import type { ApiResponse } from "../schemas/jobs";
import type { Job, PromiseWithError } from "../types";

export const parseJobs = (data: ApiResponse): Job[] => {
  return data.jobs_results.map((job) => ({
    title: job.title,
    company: job.company_name,
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

export const getLocationOption = async (
  location?: string,
): PromiseWithError<string> => {
  if (location === "" || location == null) {
    const [coordsError, coords] = await getCurrentCoords();

    if (coordsError) {
      return [coordsError];
    }

    const [locationError, coordsLocation] = await searchLocation({ coords });

    if (locationError) {
      return [locationError];
    }

    return [null, coordsLocation.name];
  }

  // INFO: about zipcode
  // - https://en.wikipedia.org/wiki/ZIP_Code
  // - https://tools.usps.com/zip-code-lookup.htm
  const zipCode = parseInt(location);

  if (!isNaN(zipCode)) {
    const [locationError, zipLocation] = await searchLocation({ zipCode });

    if (locationError) {
      return [locationError];
    }

    return [null, zipLocation.name];
  }

  return [null, location];
};

export const createJobLink = (job: Job) => {
  const { title, company, location } = job;

  const link = `${sanitizeString(title)}-${sanitizeString(
    company,
  )}-${sanitizeString(location)}`;

  return link.replace(/\s/g, "-");
};
