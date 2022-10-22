import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { Controller } from "./controller";
import { ERRORS } from "../use-cases/utils/errors";
import { UpdateCardRequest } from "../use-cases/ports/requests";

export class UpdateCardController extends Controller {
  private mandatoryFields = ["id"];
  protected expectedExceptionsToStatusCode: { [errorName: string]: number } = {
    [ERRORS.EXISTENT_CARD.name]: 400,
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
