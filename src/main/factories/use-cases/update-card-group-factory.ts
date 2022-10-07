import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { UpdateCardGroup } from "../../../use-cases/update-card-group/update-card-group";

export class UpdateCardGroupFactory {
  public static make() {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    return new UpdateCardGroup(cardGroupRepository);
  }
}
