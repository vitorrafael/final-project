import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { DisplayCardGroups } from "../../../src/use-cases/display-card-groups/display-card-groups";

use(chaiAsPromised);

const HISTORY_CARD_GROUP = {
  id: "1",
  topic: "History",
  description: "History Cards about the Farroupilha Revolution",
};

const MATH_CARD_GROUP = {
  id: "2",
  topic: "Math",
  description: "Math cards",
};

const FIRST_CARD = {
  id: "1",
  front: "What year did the Farroupilha Revolution start?",
  back: "1835",
  nextReviewDue: new Date(2022, 3, 1),
  reviewCount: 3,
  eFactor: 2.5,
  groupId: "1",
};

const SECOND_CARD = {
  id: "2",
  front: "Who was the leader of Farroupilha Revolution?",
  back: "Bento Gonçalvez",
  nextReviewDue: new Date(Date.now() + 24 * 60 * 60 * 2),
  reviewCount: 1,
  eFactor: 2.5,
  groupId: "1",
};

const HISTORY_CARD_GROUP_WITH_CARDS = {
  ...HISTORY_CARD_GROUP,
  cards: [FIRST_CARD, SECOND_CARD],
};

const MATH_CARD_GROUP_WITH_CARDS = {
  ...MATH_CARD_GROUP,
  cards: [],
};

context("[Use Case] Display Card Groups", async () => {
  let cardGroupRepository, cardRepository;
  beforeEach(() => {
    cardGroupRepository = new InMemoryCardGroupRepository([
      HISTORY_CARD_GROUP,
      MATH_CARD_GROUP,
    ]);
    cardRepository = new InMemoryCardRepository([FIRST_CARD, SECOND_CARD]);
  });

  describe("execute", async () => {
    it("should return all card groups", async () => {
      const useCase = new DisplayCardGroups(
        cardGroupRepository,
        cardRepository
      );

      const cardGroups = await useCase.execute({});

      expect(cardGroups.length).to.be.equal(2);
      expect(cardGroups).to.deep.contain(HISTORY_CARD_GROUP_WITH_CARDS);
      expect(cardGroups).to.deep.contain(MATH_CARD_GROUP_WITH_CARDS);
    });
  });
});
