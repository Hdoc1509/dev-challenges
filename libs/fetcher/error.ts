export class ServiceError {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  response() {
    return new Error(`${this.name} service response error`);
  }

  validation() {
    return new Error(`${this.name} service data error. Invalid data`);
  }

  timeout() {
    return new Error(`${this.name} service response timed out`);
  }

  network() {
    return new Error(
      `${this.name} service network error. Unable to connect to the server`,
    );
  }

  unknown() {
    return new Error(`${this.name} service unknown error`);
  }
}
