import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import { DeleteCardRequest, UseCase } from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

export class DeleteCardController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [ERRORS["UNEXISTENT_CARD"].name]: 404,
  };

  public constructor(
    private readonly useCase: UseCase<DeleteCardRequest, void>
  ) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardData: DeleteCardRequest = {
        id: request.body.id as number,
      };

      await this.useCase.execute(cardData);

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (error) {
      const statusCode = this.mapExceptionToStatusCode(error);
      return {
        statusCode,
        body: JSON.stringify(error.message),
      };
    }
  }
}
