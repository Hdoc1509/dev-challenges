import * as z from "zod";

const DetectedExtensionsSchema = z.object({
  schedule_type: z.string(),
  work_from_home: z.boolean().optional(),
  posted_at: z.string().optional(),
  salary: z.string().optional(),
});

const JobHighlightSchema = z.object({
  title: z.string().optional(),
  items: z.array(z.string()),
});

const SearchMetadataSchema = z.object({
  id: z.string(),
  status: z.string(),
  json_endpoint: z.string(),
  created_at: z.string(),
  processed_at: z.string(),
  google_jobs_url: z.string(),
  raw_html_file: z.string(),
  total_time_taken: z.number(),
});

const SearchParametersSchema = z.object({
  q: z.string(),
  engine: z.string(),
  google_domain: z.string(),
  start: z.number(),
  chips: z.string().optional(),
});

const JobsResultSchema = z.object({
  title: z.string(),
  company_name: z.string(),
  location: z.string(),
  via: z.string(),
  description: z.string(),
  job_highlights: z.array(JobHighlightSchema),
  extensions: z.array(z.string()),
  detected_extensions: DetectedExtensionsSchema,
  job_id: z.string(),
  thumbnail: z.string().optional(),
});
export type JobsResult = z.infer<typeof JobsResultSchema>;

// based on https://serpapi.com/playground?engine=google_jobs
export const JobsResponseSchema = z.object({
  search_metadata: SearchMetadataSchema,
  search_parameters: SearchParametersSchema,
  jobs_results: z.array(JobsResultSchema),
});
export type JobsResponse = z.infer<typeof JobsResponseSchema>;

// based on src/mocks/jobs-invalid.json
const SearchInformationSchema = z.object({
  jobs_results_state: z.string(),
});
export const JobsErrorResponseSchema = z.object({
  search_metadata: SearchMetadataSchema,
  search_parameters: SearchParametersSchema,
  search_information: SearchInformationSchema,
  error: z.string(),
});
