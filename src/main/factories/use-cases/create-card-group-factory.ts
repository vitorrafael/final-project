import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { CreateCardGroup } from "../../../use-cases";

export class CreateCardGroupFactory {
  public static make(): CreateCardGroup {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    return new CreateCardGroup(cardGroupRepository);
  }
}
