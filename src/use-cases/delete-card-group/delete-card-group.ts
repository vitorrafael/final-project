import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export interface DeleteCardGroupRequest {
  id: string;
}

export class DeleteCardGroup implements UseCase {
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

    if (!Boolean(cardGroup)) {
      throw new Error();
    }

    await this.cardRepository.deleteByGroupId(cardGroup.id);
    await this.cardGroupRepository.delete(cardGroup.id);
  }
}
