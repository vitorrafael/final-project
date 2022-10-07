import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { UpdateCard } from "../../../use-cases/update-card/update-card";

export class UpdateCardFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    return new UpdateCard(cardRepository);
  }
}
