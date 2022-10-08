import { CreateCardRequest } from "../use-cases/create-card/create-card";
import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { Controller } from "./ports/controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { ERRORS } from "../use-cases/utils/errors";

export class CreateCardController extends Controller {
  private readonly mandatoryParameters = ["front", "back"];
  
  protected readonly expectedExceptionsToStatusCode = {
    [ERRORS.EXISTENT_CARD.name]: 400,
  };

  constructor(private readonly useCase: UseCase) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryParameters);

      const cardData: CreateCardRequest = {
        front: request.body.front,
        back: request.body.back,
        groupId: request.body.groupId,
      };

      const useCaseResponse: CardData = await this.useCase.execute(cardData);

      return {
        statusCode: 200,
        body: useCaseResponse,
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
