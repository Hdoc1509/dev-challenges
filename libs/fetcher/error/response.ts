export class ResponseError extends Error {
  res: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.name = "ResponseError";
    this.res = res;
  }
}
