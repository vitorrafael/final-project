import { CardGroupWithCards } from "../../entities/card-group/card-group";
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
}
