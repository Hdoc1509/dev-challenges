export class JobsResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.name = "JobsError";
    this.response = res;
  }
}
