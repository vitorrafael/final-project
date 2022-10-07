import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { DeleteCard } from "../../../use-cases/delete-card/delete-card";

export class DeleteCardFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    return new DeleteCard(cardRepository);
  }
}
