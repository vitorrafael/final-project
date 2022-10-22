import { CardGroupWithCards } from "../use-cases/ports/card-group-data";
import { UseCase } from "../use-cases/ports/use-case";
import { Controller } from "./controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class DisplayCardGroupsController extends Controller {
  private readonly mandatoryParameters = [];

  protected readonly expectedExceptionsToStatusCode = {};

  constructor(private readonly useCase: UseCase<object, CardGroupWithCards[]>) {
    super();
  }

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupWithCards[]>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryParameters);
      const useCaseResponse: CardGroupWithCards[] = await this.useCase.execute(
        {}
      );
      return {
        statusCode: 200,
        body: useCaseResponse
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
