import { SubmitReviewRequest } from "../use-cases/ports/requests";
import { UseCase } from "../use-cases/ports/use-case";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class SubmitReviewController extends Controller {
  private mandatoryFields = ["id", "responseQuality"];

  public constructor(private useCase: UseCase<SubmitReviewRequest, void>) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const submitReviewRequest: SubmitReviewRequest = {
        id: request.body.id as number,
        front: request.body.cardFront as string,
        responseQuality: request.body.responseQuality as number,
      };

      await this.useCase.execute(submitReviewRequest);

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (error) {
      const statusCode = this.mapExceptionToStatusCode(error);

      return {
        statusCode,
        body: error.message,
      };
    }
  }
}
