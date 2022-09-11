import { CardGroupWithCards } from "../../entities/card-group/card-group";
import { CardGroupData } from "../../use-cases/ports/card-group";
import { CardGroupRepository } from "../../use-cases/ports/card-group-repository";

export class InMemoryCardGroupRepository implements CardGroupRepository {
  private cardGroups: CardGroupWithCards[] = [];
  constructor(cardGroups: CardGroupWithCards[]) {
    this.cardGroups = cardGroups;
  }

  public findCardGroupByTheme(theme: String): Promise<CardGroupWithCards> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.topic === theme)
    );
  }

  public add(cardGroup: CardGroupData): Promise<CardGroupData> {
    this.cardGroups.push({
      id: (this.cardGroups.length + 1).toString(),
      ...cardGroup,
      cards: [],
    });
    return Promise.resolve(this.cardGroups[this.cardGroups.length - 1]);
  }
}
