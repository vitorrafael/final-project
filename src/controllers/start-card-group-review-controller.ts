import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import {
  CardGroupWithCards,
  Errors,
  StartCardGroupReviewRequest,
  UseCase,
} from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

// Coupling = 1: Depends on Interface and Inheritance should not be considered
export class StartCardGroupReviewController extends Controller {
  private mandatoryFields = ["topic"];
  protected expectedExceptionsToStatusCode = {
    [Errors.UNEXISTENT_CARD_GROUP]: 400,
  };

  public constructor(
    private useCase: UseCase<StartCardGroupReviewRequest, CardGroupWithCards>
  ) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupWithCards>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const startCardGroupReviewRequest: StartCardGroupReviewRequest = {
        topic: request.body.topic as string,
      };

      const response = await this.useCase.execute(startCardGroupReviewRequest);

      return {
        statusCode: 200,
        body: response,
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
