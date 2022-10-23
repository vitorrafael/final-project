import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { DeleteCard } from "../../../use-cases";

// Coupling = 2
export class DeleteCardFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    return new DeleteCard(cardRepository);
  }
}
