import { $quote } from "@/ui/quote/elements";

/** @param {import("@lib/fetcher").Status} status */
export const setFetchingStatus = (status) =>
  $quote.setAttribute("data-status", status);
