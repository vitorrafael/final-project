import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { DeleteCardGroupRequest } from "../ports/requests";
import { UseCase } from "../ports/use-case";
import { ERRORS } from "../utils/errors";

// Ce = 0
export class DeleteCardGroup implements UseCase<DeleteCardGroupRequest, void> {
  constructor(
    private readonly cardGroupRepository: CardGroupRepository,
    private readonly cardRepository: CardRepository
  ) {}

  public async execute(
    deleteCardGroupRequest: DeleteCardGroupRequest
  ): Promise<void> {
    const cardGroup = await this.cardGroupRepository.findCardGroupById(
      deleteCardGroupRequest.id
    );

    if (!cardGroup) {
      throw ERRORS["UNEXISTENT_CARD_GROUP"];
    }

    await this.cardRepository.deleteByGroupId(cardGroup.id);
    await this.cardGroupRepository.delete(cardGroup.id);
  }
}
