const { VITE_SERPAPI_API_KEY } = import.meta.env;

// Documentation
// - https://serpapi.com/google-jobs-api
export const SERPAPI = {
  KEY: VITE_SERPAPI_API_KEY,
  URL: "https://serpapi.com",
};
