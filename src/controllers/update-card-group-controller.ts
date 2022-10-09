import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { UpdateCardGroupRequest } from "../use-cases/update-card-group/update-card-group";
import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class UpdateCardGroupController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [ERRORS["EXISTENT_CARD_GROUP"].name]: 400,
  };

  public constructor(private useCase: UseCase) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: UpdateCardGroupRequest = {
        id: request.body.id,
        topic: request.body.topic,
        description: request.body.description,
      };

      const response = await this.useCase.execute(cardGroupData);

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
