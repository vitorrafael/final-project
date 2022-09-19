import { CardGroupWithCards } from "../../../entities/card-group/card-group";
import { CardGroupData } from "../../../use-cases/ports/card-group";
import { CardGroupRepository } from "../../../use-cases/ports/card-group-repository";

interface TempCardGroup extends CardGroupWithCards {
  id?: string;
}

export class InMemoryCardGroupRepository implements CardGroupRepository {
  private cardGroups: TempCardGroup[] = [];
  constructor(cardGroups: TempCardGroup[]) {
    this.cardGroups = cardGroups;
  }

  public findCardGroupByTheme(theme: String): Promise<CardGroupWithCards> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.topic === theme)
    );
  }

  public findCardGroupById(id: String): Promise<CardGroupWithCards> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.id === id)
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

  public updateTopic(id: string, updatedTopic: string): Promise<CardGroupData> {
    const cardGroupIndex = this.cardGroups.findIndex(
      (cardGroup) => cardGroup.id === id
    );
    this.cardGroups[cardGroupIndex].topic = updatedTopic;
    return Promise.resolve(this.cardGroups[cardGroupIndex]);
  }

  public updateDescription(id: string, updatedDescription: string): Promise<CardGroupData> {
    const cardGroupIndex = this.cardGroups.findIndex(
      (cardGroup) => cardGroup.id === id
    );
    this.cardGroups[cardGroupIndex].description = updatedDescription;
    return Promise.resolve(this.cardGroups[cardGroupIndex]);
  }
}
