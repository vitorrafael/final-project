import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";
import { UpdateCardRequest } from "../use-cases/update-card/update-card";
import { Controller } from "./ports/controller";

export class UpdateCardController implements Controller {
  private mandatoryFields = ["id"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const updateCardData: UpdateCardRequest = {
        id: request.body.id,
        front: request.body.front,
        back: request.body.back,
      };

      const response = await this.useCase.execute(updateCardData);

      return {
        statusCode: 200,
        body: response,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
