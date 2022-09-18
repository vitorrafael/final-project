import { use, expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { CreateCard } from "../../../src/use-cases/create-card/create-card";

use(chaiAsPromised);

describe("[Use Case] Create Card", () => {
  it("should create a card if information is valid", async () => {
    const cardData = { front: "What's the answer of everything?", back: "42" };
    const cardRepository = new InMemoryCardRepository([]);
    const useCase = new CreateCard(cardRepository);

    await useCase.createCard(cardData);

    const persistedCard = await cardRepository.findCardByFront(cardData.front);
    expect(persistedCard).to.not.be.undefined;
    expect(persistedCard.front).to.be.equal(cardData.front);
    expect(persistedCard.back).to.be.equal(cardData.back);
  });

  it("should throw an error if the to-be-created card already exists", async () => {
    const cardData = { id: "1", front: "What's the answer of everything?", back: "42" };
    const cardRepository = new InMemoryCardRepository([cardData]);
    const useCase = new CreateCard(cardRepository);

    return expect(useCase.createCard(cardData)).to.be.eventually.rejectedWith(
      Error,
      "Card already exists"
    );
  });
});
