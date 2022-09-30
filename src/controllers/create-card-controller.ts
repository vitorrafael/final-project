import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";

export class CreateCard {
  constructor(private readonly useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      const cardData: CardData = {
        front: request.body.front,
        back: request.body.back,
        groupId: request.body.groupId,
      };

      const useCaseResponse: CardData = await this.useCase.execute(cardData);

      return {
        statusCode: 200,
        body: useCaseResponse,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }
  }
}
