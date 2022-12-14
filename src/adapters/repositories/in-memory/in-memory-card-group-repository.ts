import { CardGroupData, CardGroupRepository } from "../../../use-cases/ports";

export class InMemoryCardGroupRepository implements CardGroupRepository {
  private cardGroups: CardGroupData[] = [];
  constructor(cardGroups: CardGroupData[]) {
    this.cardGroups = cardGroups;
  }

  public findAllCardGroups(): Promise<CardGroupData[]> {
    return Promise.resolve(this.cardGroups);
  }

  public findCardGroupByTheme(theme: string): Promise<CardGroupData> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.topic === theme)
    );
  }

  public findCardGroupById(id: number): Promise<CardGroupData> {
    return Promise.resolve(
      this.cardGroups.find((cardGroup) => cardGroup.id === id)
    );
  }

  public add(cardGroup: CardGroupData): Promise<CardGroupData> {
    this.cardGroups.push({
      id: (this.cardGroups.length + 1),
      ...cardGroup,
    });
    return Promise.resolve(this.cardGroups[this.cardGroups.length - 1]);
  }

  public updateTopic(id: number, updatedTopic: string): Promise<CardGroupData> {
    const cardGroupIndex = this.cardGroups.findIndex(
      (cardGroup) => cardGroup.id === id
    );
    this.cardGroups[cardGroupIndex].topic = updatedTopic;
    return Promise.resolve(this.cardGroups[cardGroupIndex]);
  }

  public updateDescription(
    id: number,
    updatedDescription: string
  ): Promise<CardGroupData> {
    const cardGroupIndex = this.cardGroups.findIndex(
      (cardGroup) => cardGroup.id === id
    );
    this.cardGroups[cardGroupIndex].description = updatedDescription;
    return Promise.resolve(this.cardGroups[cardGroupIndex]);
  }

  public async delete(id: number): Promise<void> {
    const groupIndex = this.cardGroups.findIndex((group) => group.id === id);
    this.cardGroups.splice(groupIndex, 1);
  }
}
