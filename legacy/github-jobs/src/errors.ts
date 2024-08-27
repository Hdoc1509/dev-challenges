export class JobsEmptyResultsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JobsEmptyResultsError";
  }
}
