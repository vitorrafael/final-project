import { DeleteCardGroupRequest } from "../use-cases/delete-card-group/delete-card-group";
import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class DeleteCardGroupController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [ERRORS.UNEXISTENT_CARD_GROUP.name]: 404,
  };

  public constructor(private useCase: UseCase) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: DeleteCardGroupRequest = {
        id: request.body.id,
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
