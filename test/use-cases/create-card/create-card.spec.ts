import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";

import { CreateCard } from "../../../src/use-cases/create-card/create-card";
import { ERRORS } from "../../../src/use-cases/utils/errors";

use(chaiAsPromised);

const DEFAULT_CARD_GROUP = {
  id: "1",
  topic: "Default",
  description: "Default Theme",
  cards: [],
};

const RANDOM_CARD_GROUP = {
  id: "2",
  topic: "Random",
  description: "Group with Random Questions",
  cards: [],
};

const RANDOM_CARD = {
  front: "What's the answer of everything?",
  back: "42",
  groupId: "2",
};

const CARD_WITHOUT_CARD_GROUP = {
  front: "This is a default question, what do you think?",
  back: "Yeah, great",
};

describe("[Use Case] Create Card", () => {
  it("should create a card if information is valid", async () => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      DEFAULT_CARD_GROUP,
      RANDOM_CARD_GROUP,
    ]);
    const cardRepository = new InMemoryCardRepository([]);
    const useCase = new CreateCard(cardRepository, cardGroupRepository);

    await useCase.execute(RANDOM_CARD);

    const persistedCard = await cardRepository.findCardByFront(
      RANDOM_CARD.front
    );
    expect(persistedCard).to.not.be.undefined;
    expect(persistedCard.front).to.be.equal(RANDOM_CARD.front);
    expect(persistedCard.back).to.be.equal(RANDOM_CARD.back);
    expect(persistedCard.groupId).to.be.equal(RANDOM_CARD_GROUP.id);
  });

  it("should create card in default card group if no card group was given", async () => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      DEFAULT_CARD_GROUP,
      RANDOM_CARD_GROUP,
    ]);
    const cardRepository = new InMemoryCardRepository([]);
    const useCase = new CreateCard(cardRepository, cardGroupRepository);

    await useCase.execute(CARD_WITHOUT_CARD_GROUP);

    const persistedCard = await cardRepository.findCardByFront(
      CARD_WITHOUT_CARD_GROUP.front
    );
    expect(persistedCard).to.not.be.undefined;
    expect(persistedCard.front).to.be.equal(CARD_WITHOUT_CARD_GROUP.front);
    expect(persistedCard.back).to.be.equal(CARD_WITHOUT_CARD_GROUP.back);
    expect(persistedCard.groupId).to.be.equal(DEFAULT_CARD_GROUP.id);
  });

  it("should throw an error if the to-be-created card already exists", async () => {
    const cardRepository = new InMemoryCardRepository([RANDOM_CARD]);
    const cardGroupRepository = new InMemoryCardGroupRepository([
      DEFAULT_CARD_GROUP,
      RANDOM_CARD_GROUP,
    ]);
    const useCase = new CreateCard(cardRepository, cardGroupRepository);

    return expect(useCase.execute(RANDOM_CARD)).to.be.eventually.rejectedWith(
      ERRORS.EXISTENT_CARD
    );
  });
});
