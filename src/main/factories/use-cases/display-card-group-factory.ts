import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { DisplayCardGroups } from "../../../use-cases";

// Coupling = 3
export class DisplayCardGroupsFactory {
  public static make() {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    const cardRepository = new SQLiteCardRepository();
    return new DisplayCardGroups(cardGroupRepository, cardRepository);
  }
}
