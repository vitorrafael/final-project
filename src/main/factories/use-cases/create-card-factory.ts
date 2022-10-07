import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { CreateCard } from "../../../use-cases/create-card/create-card";

export class CreateCardFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    const cardGroupRepository = new SQLiteCardGroupRepository();
    return new CreateCard(cardRepository, cardGroupRepository);
  }
}