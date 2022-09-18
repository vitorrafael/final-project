import { CardGroupData } from "../../../use-cases/ports/card-group";
import { CardGroupRepository, RepositoryCardGroup } from "../../../use-cases/ports/card-group-repository";

export class SQLiteCardGroupRepository implements CardGroupRepository {
  findCardGroupByTheme(theme: String): Promise<RepositoryCardGroup> {
    throw new Error("Method not implemented.");
  }
  findCardGroupById(id: String): Promise<RepositoryCardGroup> {
    throw new Error("Method not implemented.");
  }
  add(cardGroup: CardGroupData): Promise<CardGroupData> {
    throw new Error("Method not implemented.");
  }
  updateTopic(id: string, updatedTopic: string): Promise<CardGroupData> {
    throw new Error("Method not implemented.");
  }
  updateDescription(id: string, updatedDescription: string): Promise<CardGroupData> {
    throw new Error("Method not implemented.");
  }
  updateTags(id: string, updatedTags: string[]): Promise<CardGroupData> {
    throw new Error("Method not implemented.");
  }

}