import { CardGroupData } from "./card-group";

export interface CardGroupRepository {
  findCardGroupByTheme(theme: String): Promise<CardGroupData>;
  findCardGroupById(id: String): Promise<CardGroupData>;
  add(cardGroup: CardGroupData): Promise<CardGroupData>;
  updateTopic(id: string, updatedTopic: string): Promise<CardGroupData>;
  updateDescription(
    id: string,
    updatedDescription: string
  ): Promise<CardGroupData>;
  delete(id): Promise<void>;
}
