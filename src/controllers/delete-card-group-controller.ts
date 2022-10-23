import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import { DeleteCardGroupRequest, Errors, UseCase } from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

// Coupling = 1: Depends on Interface and Inheritance should not be considered
export class DeleteCardGroupController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [Errors.UNEXISTENT_CARD_GROUP]: 404,
  };

  public constructor(private useCase: UseCase<DeleteCardGroupRequest, void>) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: DeleteCardGroupRequest = {
        id: request.body.id as number,
      };

      await this.useCase.execute(cardGroupData);

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
