import { z } from "zod";

export const RemainingSearchesResponseSchema = z.object({
  account_status: z.string(),
  plan_id: z.string(),
  plan_name: z.string(),
  plan_monthly_price: z.number(),
  searches_per_month: z.number(),
  plan_searches_left: z.number(),
  extra_credits: z.number(),
  total_searches_left: z.number(),
  this_month_usage: z.number(),
  this_hour_searches: z.number(),
  last_hour_searches: z.number(),
  account_rate_limit_per_hour: z.number(),
});
export type RemainingSearchesResponse = z.infer<
  typeof RemainingSearchesResponseSchema
>;
