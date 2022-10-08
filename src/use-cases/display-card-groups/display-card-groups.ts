import { CardGroupData, CardGroupWithCards } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export class DisplayCardGroups implements UseCase {
  public constructor(
    private cardGroupRepository: CardGroupRepository,
    private cardRepository: CardRepository
  ) {}

  public async execute(requestData: any): Promise<CardGroupWithCards[]> {
    const cardGroupsData = await this.cardGroupRepository.findAllCardGroups();

    const cardGroupsWithCards = await this.fillCardGroupsWithCards(
      cardGroupsData
    );

    return cardGroupsWithCards;
  }

  private async fillCardGroupsWithCards(
    cardGroups: CardGroupData[]
  ): Promise<CardGroupWithCards[]> {
    return Promise.all(
      cardGroups.map(async (cardGroup) => {
        const cards = await this.cardRepository.findCardsByGroupId(
          cardGroup.id
        );
        return {
          ...cardGroup,
          cards,
        } as CardGroupWithCards;
      })
    );
  }
}
