import * as z from "zod";

// TODO: use z.string().trim()
const OptionSchema = z.object({
  text: z.string(),
  value: z.string().optional(),
});

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

const RelatedLinkSchema = z.object({
  link: z.string(),
  text: z.string(),
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
});

const ChipSchema = z.object({
  type: z.string(),
  param: z.string(),
  options: z.array(OptionSchema),
});

const JobsResultSchema = z.object({
  title: z.string(),
  company_name: z.string(),
  location: z.string(),
  via: z.string(),
  description: z.string(),
  job_highlights: z.array(JobHighlightSchema),
  related_links: z.array(RelatedLinkSchema),
  extensions: z.array(z.string()),
  detected_extensions: DetectedExtensionsSchema,
  job_id: z.string(),
  thumbnail: z.string().optional(),
});
export type JobsResult = z.infer<typeof JobsResultSchema>;

export const ApiResponseSchema = z.object({
  search_metadata: SearchMetadataSchema,
  search_parameters: SearchParametersSchema,
  jobs_results: z.array(JobsResultSchema),
  chips: z.array(ChipSchema),
});
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
