import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class SubmitReviewController {
  private mandatoryFields = ["id", "responseQuality"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const submitReviewData: {
        id: string;
        cardFront: string;
        responseQuality: number;
      } = {
        id: request.body.id,
        cardFront: request.body.cardFront,
        responseQuality: request.body.responseQuality,
      };

      await this.useCase.execute(submitReviewData);

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
