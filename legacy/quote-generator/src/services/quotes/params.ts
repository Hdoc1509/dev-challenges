export type AuthorQuotesParams = {
  client: { author: string };
  server: { filter: string; type: "author" };
};
