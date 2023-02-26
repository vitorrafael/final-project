import {
  CardData,
  Errors,
  UpdateCardRequest,
  UseCase,
} from "../use-cases/ports";
import { Controller } from "./controller";
import { HttpRequest, HttpResponse } from "./ports";
import { RequestValidator } from "./util/request-validator";

export class UpdateCardController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode: { [errorName: string]: number } = {
    [Errors.EXISTENT_CARD]: 400,
  };

  public constructor(private useCase: UseCase<UpdateCardRequest, CardData>) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const updateCardData: UpdateCardRequest = {
        id: request.body.id as number,
        front: request.body.front as string,
        back: request.body.back as string,
      };

      const response = await this.useCase.execute(updateCardData);

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
