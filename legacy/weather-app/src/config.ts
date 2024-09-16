// Documentation
// https://www.weatherapi.com/docs/
export const WEATHERAPI = {
  KEY: import.meta.env.WEATHERAPI_API_KEY,
  URL: "https://api.weatherapi.com/v1",
  // https://www.weatherapi.com/docs/#intro-error-codes
  ERROR_CODES: {
    INTERNAL: 9999,
  },
};

// Documentation
// https://open-meteo.com/en/docs
export const OPEN_METEO_API = {
  URL: "https://api.open-meteo.com/v1",
};
