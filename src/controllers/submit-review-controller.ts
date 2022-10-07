import { UseCase } from "../use-cases/ports/use-case";
import { SubmitReviewRequest } from "../use-cases/submit-review/submit-review";
import { Controller } from "./ports/controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class SubmitReviewController implements Controller {
  private mandatoryFields = ["id", "responseQuality"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const submitReviewRequest: SubmitReviewRequest = {
        id: request.body.id,
        front: request.body.cardFront,
        responseQuality: request.body.responseQuality,
      };

      await this.useCase.execute(submitReviewRequest);

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
