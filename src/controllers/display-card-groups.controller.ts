import { CreateCardRequest } from "../use-cases/create-card/create-card";
import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { ERRORS } from "../use-cases/utils/errors";

export class DisplayCardGroupsController extends Controller {
  private readonly mandatoryParameters = [];

  protected readonly expectedExceptionsToStatusCode = {};

  constructor(private readonly useCase: UseCase) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryParameters);
      const useCaseResponse: CardData = await this.useCase.execute({});
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
