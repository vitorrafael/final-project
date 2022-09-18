import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardGroupRepository } from "../../adapters/repositories/in-memory-card-group-repository";
import { CardGroup } from "../../entities/card-group/card-group";
import { Card } from "../../entities/card/card";
import { StartCardGroupReview } from "./start-card-group-review";

use(chaiAsPromised);

context("[Use Case] Review Card", async () => {
  describe("startReview", async () => {
    it("should return the cards of the group when starting a review", async () => {
      const cardGroup = CardGroup.create({
        topic: "History",
        description: "History Cards about the Farroupilha Revolution",
        tags: ["brazil", "revolution", "rs"],
      });
      const dueCard = Card.create(
        "What year did the Farroupilha Revolution start?",
        "1835",
        new Date(2022, 3, 1),
        3,
        2.5
      );
      const nonDueCard = Card.create(
        "Who was the leader of Farroupilha Revolution?",
        "Bento Gonçalvez",
        new Date(Date.now() + 24 * 60 * 60 * 2),
        1,
        2.5
      );

      cardGroup.addCard(dueCard);
      cardGroup.addCard(nonDueCard);

      const cardGroupRepository = new InMemoryCardGroupRepository([cardGroup]);

      const useCase = new StartCardGroupReview(cardGroupRepository);
      const reviewedTopic = "History";

      const returnedCardGroup = await useCase.startReview(reviewedTopic);

      expect(returnedCardGroup.topic).to.be.equal(reviewedTopic);
      expect(returnedCardGroup.cards).to.contain(dueCard);
      expect(returnedCardGroup.cards).to.not.contain(nonDueCard);
    });

    it("should throw an error if the reviewed topic does not exist", async () => {
      const cardGroupRepository = new InMemoryCardGroupRepository([]);

      const useCase = new StartCardGroupReview(cardGroupRepository);
      const reviewedTopic = "History";

      return expect(
        useCase.startReview(reviewedTopic)
      ).to.be.eventually.rejectedWith(
        Error,
        "Card Group not found for selected topic"
      );
    });
  });
});
