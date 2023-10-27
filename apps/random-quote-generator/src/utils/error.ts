export const parseError = (error: unknown) => {
  if (!(error instanceof Error))
    return { name: "Error", message: "An unknown error occurred" };

  if (error.message.includes("NetworkError"))
    return {
      name: "Error",
      message: "Unable to connect to the server",
    };

  if (error.name === "AbortError")
    return { name: "Error", message: "Request timed out" };

  return error;
};
