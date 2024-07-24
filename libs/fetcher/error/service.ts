import { ResponseError } from "./response";
import { ValidationError } from "./validation";
import { TimeoutError } from "./timeout";
import { NetworkError } from "./network";
import { UnknownError } from "./unknown";
import type { z } from "zod";

export class ServiceError {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  response(res: Response) {
    return new ResponseError(`${this.name} service response error`, res);
  }

  validation(error: z.ZodError) {
    return new ValidationError(
      `${this.name} service validation error. Invalid data`,
      error,
    );
  }

  timeout() {
    return new TimeoutError(`${this.name} service response timed out`);
  }

  network() {
    return new NetworkError(
      `${this.name} service network error. Unable to connect to the server`,
    );
  }

  unknown() {
    return new UnknownError(`${this.name} service unknown error`);
  }
}
