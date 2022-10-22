import { Controller } from "./controller";
import { RequestValidator } from "./util/request-validator";

import { CardGroupWithCards, UseCase } from "../use-cases/ports";
import { HttpRequest, HttpResponse } from "./ports";

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
