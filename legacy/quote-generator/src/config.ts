const { FAVQS_API_KEY } = import.meta.env;

// https://favqs.com/api
export const FAVQS_API = {
  URL: "https://favqs.com/api",
  KEY: FAVQS_API_KEY,
  HEADERS: {
    Authorization: `Token token=${FAVQS_API_KEY}`,
  },
  // https://favqs.com/api#ErrorCodes
  ERROR_CODE: {
    INVALID_REQUEST: 10,
    PERMISSION_DENIED: 11,
    AUTHOR_NOT_FOUND: 50,
  },
};
