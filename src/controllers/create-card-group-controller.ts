import { CreateCardGroupRequest } from "../use-cases/create-card-group/create-card-group";
import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class CreateCardGroupController extends Controller {
  private mandatoryFields = ["topic"];
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

      const cardGroupData: CreateCardGroupRequest = {
        topic: request.body.topic,
        description: request.body.description,
      };

      const response = await this.useCase.execute(cardGroupData);

      return { statusCode: 200, body: response };
    } catch (error) {
      const statusCode = this.mapExceptionToStatusCode(error);

      return { statusCode, body: error.message };
    }
  }
}
