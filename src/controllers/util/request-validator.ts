import { HttpRequest } from "../ports/http-request";
import { InvalidRequestError } from "./errors/invalid-request-error";

// Coupling = 1
export class RequestValidator {
  public static validateRequest(
    request: HttpRequest,
    mandatoryParameters: string[]
  ) {
    const requestParameters = Object.keys(request.body);

    const missingParameters: string[] = [];
    mandatoryParameters.forEach((mandatoryParameter) => {
      if (!requestParameters.includes(mandatoryParameter)) {
        missingParameters.push(mandatoryParameter);
      }
    });

    if (missingParameters.length > 0) {
      throw new InvalidRequestError(missingParameters);
    }
  }
}
