import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import {
  CardGroupData,
  CreateCardGroupRequest,
  Errors,
  UseCase,
} from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

export class CreateCardGroupController extends Controller {
  private mandatoryFields = ["topic"];
  protected expectedExceptionsToStatusCode = {
    [Errors.EXISTENT_CARD_GROUP]: 400,
  };

  public constructor(
    private useCase: UseCase<CreateCardGroupRequest, CardGroupData>
  ) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: CreateCardGroupRequest = {
        topic: request.body.topic as string,
        description: request.body.description as string,
      };

      const response = await this.useCase.execute(cardGroupData);

      return { statusCode: 200, body: response };
    } catch (error) {
      const statusCode = this.mapExceptionToStatusCode(error);

      return { statusCode, body: error.message };
    }
  }
}
