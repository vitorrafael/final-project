import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { UpdateCard } from "../../../use-cases";
// Ce = 1
export class UpdateCardFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    return new UpdateCard(cardRepository);
  }
}
