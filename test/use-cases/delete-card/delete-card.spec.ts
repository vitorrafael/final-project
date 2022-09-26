import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";

import { DeleteCard } from "../../../src/use-cases/delete-card/delete-card";

use(chaiAsPromised);

const RANDOM_CARD = {
  id: "1",
  front: "What's the answer of everything?",
  back: "42",
  nextReviewDue: new Date(2022, 9 - 1, 10),
  groupId: "2",
};

describe("[Use Case] Delete Card", () => {
  it("should delete card if it exists", async () => {
    const cardRepository = new InMemoryCardRepository([RANDOM_CARD]);

    const useCase = new DeleteCard(cardRepository);

    await useCase.execute(RANDOM_CARD);

    expect(await cardRepository.findCardById(RANDOM_CARD.id)).to.be.undefined;
  });

  it("should throw an error if the to-be-created card already exists", async () => {
    const cardRepository = new InMemoryCardRepository([]);

    const useCase = new DeleteCard(cardRepository);

    return expect(useCase.execute(RANDOM_CARD)).to.be.eventually.rejectedWith(
      Error
    );
  });
});
