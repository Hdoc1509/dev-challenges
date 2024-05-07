const { VITE_SERPAPI_API_KEY, VITE_SERPAPI_URL } = import.meta.env;

// Documentation
// - https://serpapi.com/google-jobs-api
export const SERPAPI = {
  KEY: VITE_SERPAPI_API_KEY,
  URL: VITE_SERPAPI_URL,
};
