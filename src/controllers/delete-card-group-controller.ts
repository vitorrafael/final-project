import { CardGroupData } from "../use-cases/ports/card-group";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class DeleteCardGroupController {
  private mandatoryFields = ["id"];

  public constructor(private useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardGroupData: CardGroupData = {
        id: request.body.id,
        topic: request.body.topic,
        description: request.body.description,
      };

      await this.useCase.execute(cardGroupData);

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error.message),
      };
    }
  }
}
