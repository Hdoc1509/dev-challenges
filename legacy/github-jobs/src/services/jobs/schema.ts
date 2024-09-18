import * as z from "zod";

const ApplyOptionSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const DetectedExtensionsSchema = z.object({
  posted_at: z.string().optional(),
  schedule_type: z.string(),
  health_insurance: z.boolean().optional(),
  dental_coverage: z.boolean().optional(),
  paid_time_off: z.boolean().optional(),
});

const JobHighlightSchema = z.object({
  title: z.string(),
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
});

const SerpapiPaginationSchema = z.object({
  next_page_token: z.string(),
  next: z.string(),
});

export const JobsResultSchema = z.object({
  title: z.string(),
  company_name: z.string(),
  location: z.string(),
  via: z.string(),
  share_link: z.string(),
  thumbnail: z.string().optional(),
  extensions: z.array(z.string()),
  detected_extensions: DetectedExtensionsSchema,
  description: z.string(),
  job_highlights: z.array(JobHighlightSchema).optional(),
  apply_options: z.array(ApplyOptionSchema),
  job_id: z.string(),
});
export type JobsResult = z.infer<typeof JobsResultSchema>;

// based on https://serpapi.com/playground?engine=google_jobs
export const JobsResponseSchema = z.object({
  search_metadata: SearchMetadataSchema,
  search_parameters: SearchParametersSchema,
  serpapi_pagination: SerpapiPaginationSchema.optional(),
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
