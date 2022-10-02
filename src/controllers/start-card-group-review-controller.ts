import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { CardGroupWithCards } from "../use-cases/ports/card-group";
import { StartCardGroupReviewRequest } from "../use-cases/start-card-group-review/start-card-group-review";

export class StartCardGroupReviewController {
  private mandatoryFields = ["topic"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupWithCards>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const startCardGroupReviewRequest: StartCardGroupReviewRequest = {
        topic: request.body.topic,
      };

      const response = await this.useCase.execute(startCardGroupReviewRequest);

      return {
        statusCode: 200,
        body: response,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
