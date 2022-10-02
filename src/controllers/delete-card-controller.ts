import { DeleteCardRequest } from "../use-cases/delete-card/delete-card";
import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class DeleteCardController {
  private mandatoryFields = ["id"];

  public constructor(private readonly useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<undefined>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryFields);

      const cardData: DeleteCardRequest = {
        id: request.body.id,
        front: request.body.front,
        back: request.body.back,
      };

      await this.useCase.execute(cardData);

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
