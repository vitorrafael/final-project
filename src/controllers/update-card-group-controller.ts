import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { UpdateCardRequest } from "../use-cases/update-card/update-card";
import { Controller } from "./ports/controller";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class UpdateCardGroupController implements Controller {
  private mandatoryFields = ["id"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardData: UpdateCardRequest = {
        id: request.body.id,
        front: request.body.front,
        back: request.body.back,
      };

      const response = await this.useCase.execute(cardData);

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
