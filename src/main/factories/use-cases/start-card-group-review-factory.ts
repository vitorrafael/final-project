import { SQLiteCardGroupRepository } from "../../../adapters/repositories/sqlite/sqlite-card-group-repository";
import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { StartCardGroupReview } from "../../../use-cases/start-card-group-review/start-card-group-review";

export class StartCardGroupReviewFactory {
  public static make() {
    const cardGroupRepository = new SQLiteCardGroupRepository();
    const cardRepository = new SQLiteCardRepository();
    return new StartCardGroupReview(cardGroupRepository, cardRepository);
  }
}
