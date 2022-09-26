import { CardGroupData } from "../../../use-cases/ports/card-group";
import { CardGroupRepository } from "../../../use-cases/ports/card-group-repository";

export class InMemoryCardGroupRepository implements CardGroupRepository {
  private cardGroups: CardGroupData[] = [];
  constructor(cardGroups: CardGroupData[]) {
    this.cardGroups = cardGroups;
  }

  public findCardGroupByTheme(theme: String): Promise<CardGroupData> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.topic === theme)
    );
  }

  public findCardGroupById(id: String): Promise<CardGroupData> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.id === id)
    );
  }

  public add(cardGroup: CardGroupData): Promise<CardGroupData> {
    this.cardGroups.push({
      id: (this.cardGroups.length + 1).toString(),
      ...cardGroup,
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

  public updateDescription(
    id: string,
    updatedDescription: string
  ): Promise<CardGroupData> {
    const cardGroupIndex = this.cardGroups.findIndex(
      (cardGroup) => cardGroup.id === id
    );
    this.cardGroups[cardGroupIndex].description = updatedDescription;
    return Promise.resolve(this.cardGroups[cardGroupIndex]);
  }

  public async delete(id: any): Promise<void> {
    const groupIndex = this.cardGroups.findIndex((group) => group.id === id);
    this.cardGroups.splice(groupIndex, 1);
  }
}
