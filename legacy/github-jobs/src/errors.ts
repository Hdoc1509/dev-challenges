export class JobsEmptyResultsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobsEmptyResultsError";
  }
}

export class JobsResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.name = "JobsError";
    this.response = res;
  }
}

export class GeolocationResponseError extends Error {
  respone: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.name = "GeolocationError";
    this.respone = res;
  }
}
