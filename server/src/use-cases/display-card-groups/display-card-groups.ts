import { CardGroupData, CardGroupWithCards } from "../ports/card-group-data";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export class DisplayCardGroups
  implements UseCase<object, CardGroupWithCards[]>
{
  public constructor(
    private cardGroupRepository: CardGroupRepository,
    private cardRepository: CardRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(_requestData: object): Promise<CardGroupWithCards[]> {
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
