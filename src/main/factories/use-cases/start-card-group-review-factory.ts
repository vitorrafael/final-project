import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { StartCardGroupReview } from "../../../use-cases";

// Ca = 0
export class StartCardGroupReviewFactory {
  public static make() {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    const cardRepository = new SQLiteCardRepository();
    return new StartCardGroupReview(cardGroupRepository, cardRepository);
  }
}
