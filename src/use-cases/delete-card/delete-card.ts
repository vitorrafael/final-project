import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";

export interface DeleteCardRequest {
  id: string;
}

export class DeleteCard implements UseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(deleteCardRequest: DeleteCardRequest): Promise<void> {
    if (await this.cardRepository.findCardById(deleteCardRequest.id)) {
      await this.cardRepository.delete(deleteCardRequest.id);
    } else {
      throw ERRORS["UNEXISTENT_CARD"];
    }
  }
}
