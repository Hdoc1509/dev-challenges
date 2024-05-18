export const parseError = (error: unknown) => {
  if (!(error instanceof Error))
    return { name: "Error", message: "An unknown error occurred" };

  const { name, message } = error;

  if (message.includes("NetworkError") || message.includes("Failed to fetch"))
    return {
      name: "Error",
      message: "Unable to connect to the server",
    };

  if (name === "AbortError")
    return { name: "Error", message: "Request timed out" };

  return error;
};
