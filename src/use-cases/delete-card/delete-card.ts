import { CardRepository } from "../ports/card-repository";
import { DeleteCardRequest } from "../ports/requests";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";

// Ca = 1
export class DeleteCard implements UseCase<DeleteCardRequest, void> {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(deleteCardRequest: DeleteCardRequest): Promise<void> {
    if (await this.cardRepository.findCardById(deleteCardRequest.id)) {
      await this.cardRepository.delete(deleteCardRequest.id);
    } else {
      throw ERRORS["UNEXISTENT_CARD"];
    }
  }
}
