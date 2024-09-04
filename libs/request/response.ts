const RESPONSE_HEADERS = {
  SUCCESS: {
    "Content-Type": "application/json",
  },
};

export const createErrorResponse = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), { status });

export const createSuccessResponse = (data: unknown) =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: RESPONSE_HEADERS.SUCCESS,
  });
