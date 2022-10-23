import { SQLiteCardRepository } from "../../../adapters/repositories/sqlite/sqlite-card-repository";
import { SuperMemoAlgorithm } from "../../../entities/super-memo/super-memo-algorithm";
import { SubmitReview } from "../../../use-cases";

// Ce = 1
export class SubmitReviewFactory {
  public static make() {
    const cardRepository = new SQLiteCardRepository();
    const algorithm = new SuperMemoAlgorithm();
    return new SubmitReview(cardRepository, algorithm);
  }
}
