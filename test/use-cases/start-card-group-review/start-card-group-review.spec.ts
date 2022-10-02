import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { StartCardGroupReview } from "../../../src/use-cases/start-card-group-review/start-card-group-review";

use(chaiAsPromised);

context("[Use Case] Review Card", async () => {
  describe("execute", async () => {
    it("should return the cards of the group when starting a review", async () => {
      const cardGroup = {
        id: "1",
        topic: "History",
        description: "History Cards about the Farroupilha Revolution",
      };
      const dueCard = {
        id: "1",
        front: "What year did the Farroupilha Revolution start?",
        back: "1835",
        nextReviewDue: new Date(2022, 3, 1),
        reviewCount: 3,
        eFactor: 2.5,
        groupId: "1",
      };
      const nonDueCard = {
        id: "2",
        front: "Who was the leader of Farroupilha Revolution?",
        back: "Bento Gonçalvez",
        nextReviewDue: new Date(Date.now() + 24 * 60 * 60 * 2),
        reviewCount: 1,
        eFactor: 2.5,
        groupId: "1",
      };

      const cardRepository = new InMemoryCardRepository([dueCard, nonDueCard]);
      const cardGroupRepository = new InMemoryCardGroupRepository([cardGroup]);

      const useCase = new StartCardGroupReview(
        cardGroupRepository,
        cardRepository
      );
      const startCardGroupReviewRequest = { topic: "History" };

      const returnedCardGroup = await useCase.execute(
        startCardGroupReviewRequest
      );

      expect(returnedCardGroup.topic).to.be.equal(
        startCardGroupReviewRequest.topic
      );
      expect(returnedCardGroup.cards).to.contain(dueCard);
      expect(returnedCardGroup.cards).to.not.contain(nonDueCard);
    });

    it("should throw an error if the reviewed topic does not exist", async () => {
      const cardRepository = new InMemoryCardRepository([]);
      const cardGroupRepository = new InMemoryCardGroupRepository([]);

      const useCase = new StartCardGroupReview(
        cardGroupRepository,
        cardRepository
      );
      const startCardGroupReviewRequest = { topic: "History" };

      return expect(
        useCase.execute(startCardGroupReviewRequest)
      ).to.be.eventually.rejectedWith(
        Error,
        "Card Group not found for selected topic"
      );
    });
  });
});
