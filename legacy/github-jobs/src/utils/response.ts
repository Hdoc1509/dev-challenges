export const createResponseError = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), { status });

export const createResponseSuccess = (data: unknown) =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
