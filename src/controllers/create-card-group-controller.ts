import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class CreateCardGroupController {
  private mandatoryFields = ["topic"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardGroupData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: CardGroupData = {
        topic: request.body.topic,
        description: request.body.description,
      };

      const response = await this.useCase.execute(cardGroupData);

      return { statusCode: 200, body: response };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify(error.message) };
    }
  }
}
