import { CardGroupData } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export class DeleteCardGroup implements UseCase {
  constructor(
    private readonly cardGroupRepository: CardGroupRepository,
    private readonly cardRepository: CardRepository
  ) {}

  public async execute(cardGroupData: CardGroupData): Promise<void> {
    const cardGroup = await this.cardGroupRepository.findCardGroupById(
      cardGroupData.id
    );

    if (!Boolean(cardGroup)) {
      throw new Error();
    }

    await this.cardRepository.deleteByGroupId(cardGroup.id);
    await this.cardGroupRepository.delete(cardGroup.id);
  }
}
