import { InvalidRequestError } from "./util/errors/invalid-request-error";
import { HttpRequest, HttpResponse } from "./ports";

// Ca = 1
export abstract class Controller {
  protected readonly expectedExceptionsToStatusCode: {
    [errorName: string]: number;
  } = {};

  public abstract handleRequest(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<unknown>>;

  protected mapExceptionToStatusCode(error: Error): number {
    if (error instanceof InvalidRequestError) return 400;
    return this.expectedExceptionsToStatusCode[error.name] || 500;
  }
}
