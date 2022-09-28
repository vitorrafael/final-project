import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { SuperMemoAlgorithm } from "../../../src/entities/super-memo/super-memo-algorithm";
import { SubmitReview } from "../../../src/use-cases/submit-review/submit-review";

use(chaiAsPromised);

context("[Use Case] Submit Review", async () => {
  describe("execute", async () => {
    it("should set the next review date based on the current review results", async () => {
      const card = {
        front: "What year did the Farroupilha Revolution start?",
        back: "1835",
        nextReviewDue: new Date(2022, 9 - 1, 10),
        reviewCount: 3,
        eFactor: 2.5,
      };
      const cardRepository = new InMemoryCardRepository([card]);

      const useCase = new SubmitReview(
        cardRepository,
        new SuperMemoAlgorithm()
      );

      await useCase.execute({
        cardFront: card.front,
        responseQuality: 3,
      });

      const updatedCard = await cardRepository.findCardByFront(card.front);

      expect(updatedCard.nextReviewDue.toDateString()).to.be.deep.equal(
        new Date(2022, 9 - 1, 18).toDateString()
      );
      expect(updatedCard.eFactor).to.be.equal(2.36);
    });
  });
});
