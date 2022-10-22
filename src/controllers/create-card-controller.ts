import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { ERRORS } from "../use-cases/utils/errors";

import { CardData, CreateCardRequest, UseCase } from "../use-cases/ports"

export class CreateCardController extends Controller {
  private readonly mandatoryParameters = ["front", "back"];

  protected readonly expectedExceptionsToStatusCode = {
    [ERRORS.EXISTENT_CARD.name]: 400,
  };

  constructor(private readonly useCase: UseCase<CreateCardRequest, CardData>) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryParameters);

      const cardData: CreateCardRequest = {
        front: request.body.front as string,
        back: request.body.back as string,
        groupId: request.body.groupId as number,
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
