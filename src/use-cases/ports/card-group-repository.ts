import { CardGroupWithCards } from "../../entities/card-group/card-group";
import { CardGroupData } from "./card-group";

export interface RepositoryCardGroup extends CardGroupWithCards {
  id?: string;
}

export interface CardGroupRepository {
  findCardGroupByTheme(theme: String): Promise<RepositoryCardGroup>;
  findCardGroupById(id: String): Promise<RepositoryCardGroup>;
  add(cardGroup: CardGroupData): Promise<CardGroupData>;
  updateTopic(id: string, updatedTopic: string): Promise<CardGroupData>;
  updateDescription(
    id: string,
    updatedDescription: string
  ): Promise<CardGroupData>;
}
