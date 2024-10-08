const { SERPAPI_API_KEY, WEATHERAPI_API_KEY, DEV } = import.meta.env;

// Documentation
// - https://serpapi.com/google-jobs-api
export const SERPAPI = {
  KEY: SERPAPI_API_KEY,
  URL: "https://serpapi.com",
};

// Documentation
// - https://www.weatherapi.com/docs/
export const WEATHERAPI = {
  KEY: WEATHERAPI_API_KEY,
  URL: "https://api.weatherapi.com/v1",
  // https://www.weatherapi.com/docs/#intro-error-codes
  ERROR_CODES: {
    INTERNAL: 9999,
  },
};

// https://docs.astro.build/en/guides/environment-variables/#default-environment-variables
export const isDev = DEV;
