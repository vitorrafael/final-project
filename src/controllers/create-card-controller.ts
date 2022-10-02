import { CreateCardRequest } from "../use-cases/create-card/create-card";
import { CardData } from "../use-cases/ports/card-data";
import { UseCase } from "../use-cases/ports/use-case";
import { HttpRequest } from "./ports/http-request";
import { HttpResponse } from "./ports/http-response";
import { RequestValidator } from "./util/request-validator";

export class CreateCard {
  private readonly mandatoryParameters = ["front", "back"];
  constructor(private readonly useCase: UseCase) {}

  public async handleRequest(
    request: HttpRequest
  ): Promise<HttpResponse<CardData>> {
    try {
      RequestValidator.validateRequest(request, this.mandatoryParameters);

      const cardData: CreateCardRequest = {
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
