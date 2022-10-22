import { CardGroupData, UpdateCardGroupRequest, UseCase } from "../use-cases/ports";
import { ERRORS } from "../use-cases/utils/errors";
import { Controller } from "./controller";
import { HttpRequest, HttpResponse } from "./ports";
import { RequestValidator } from "./util/request-validator";

export class UpdateCardGroupController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode = {
    [ERRORS["EXISTENT_CARD_GROUP"].name]: 400,
  };

  public constructor(private useCase: UseCase<UpdateCardGroupRequest, CardGroupData>) {
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

      const response = await this.useCase.execute(cardGroupData) as CardGroupData;

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
