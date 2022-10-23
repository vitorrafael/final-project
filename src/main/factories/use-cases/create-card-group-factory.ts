import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { CreateCardGroup } from "../../../use-cases";

// Coupling = 2
export class CreateCardGroupFactory {
  public static make(): CreateCardGroup {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    return new CreateCardGroup(cardGroupRepository);
  }
}
