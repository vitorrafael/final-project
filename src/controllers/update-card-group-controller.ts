import {
  CardGroupData,
  Errors,
  UpdateCardGroupRequest,
  UseCase,
} from "../use-cases/ports";
import { Controller } from "./controller";
import { HttpRequest, HttpResponse } from "./ports";
import { RequestValidator } from "./util/request-validator";

// Coupling = 1: Depends on Interface and Inheritance should not be considered
export class UpdateCardGroupController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [Errors.EXISTENT_CARD_GROUP]: 400,
  };

  public constructor(
    private useCase: UseCase<UpdateCardGroupRequest, CardGroupData>
  ) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: UpdateCardGroupRequest = {
        id: request.body.id as number,
        topic: request.body.topic as string,
        description: request.body.description as string,
      };

      const response = (await this.useCase.execute(
        cardGroupData
      )) as CardGroupData;

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
