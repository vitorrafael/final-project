import { InvalidRequestError } from "./util/errors/invalid-request-error";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";

export abstract class Controller {
  protected readonly expectedExceptionsToStatusCode: {
    [errorName: string]: number;
  } = {};

  public abstract handleRequest(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<any>>;

  protected mapExceptionToStatusCode(error: Error): number {
    if (error instanceof InvalidRequestError) return 400;
    return this.expectedExceptionsToStatusCode[error.name] || 500;
  }
}
