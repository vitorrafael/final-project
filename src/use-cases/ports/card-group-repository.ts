import { CardGroupData } from "./card-group-data";

export interface CardGroupRepository {
  findAllCardGroups(): Promise<CardGroupData[]>;
  findCardGroupByTheme(theme: string): Promise<CardGroupData>;
  findCardGroupById(id: number): Promise<CardGroupData>;
  add(cardGroup: CardGroupData): Promise<CardGroupData>;
  updateTopic(id: number, updatedTopic: string): Promise<CardGroupData>;
  updateDescription(
    id: number,
    updatedDescription: string
  ): Promise<CardGroupData>;
  delete(id: number): Promise<void>;
}
