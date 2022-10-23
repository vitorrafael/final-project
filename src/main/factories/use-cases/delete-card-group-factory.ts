import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { DeleteCardGroup } from "../../../use-cases";

// Ca = 0
export class DeleteCardGroupFactory {
  public static make() {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    const cardRepository = new SQLiteCardRepository();
    return new DeleteCardGroup(cardGroupRepository, cardRepository);
  }
}
