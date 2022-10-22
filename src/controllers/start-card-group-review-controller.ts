import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import { CardGroupWithCards, StartCardGroupReviewRequest, UseCase } from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

export class StartCardGroupReviewController extends Controller {
  private mandatoryFields = ["topic"];
  protected expectedExceptionsToStatusCode = {
    [ERRORS["UNEXISTENT_CARD_GROUP"].name]: 400,
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
