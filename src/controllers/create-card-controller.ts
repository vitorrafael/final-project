import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import {
  CardData,
  CreateCardRequest,
  Errors,
  UseCase,
} from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

// Ca = 1
export class CreateCardController extends Controller {
  private readonly mandatoryParameters = ["front", "back"];

  protected readonly expectedExceptionsToStatusCode = {
    [Errors.EXISTENT_CARD]: 400,
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
