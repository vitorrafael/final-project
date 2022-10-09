import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";

import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { DeleteCardGroup } from "../../../src/use-cases/delete-card-group/delete-card-group";
import { ERRORS } from "../../../src/use-cases/utils/errors";


use(chaiAsPromised);

const CARD_GROUP = {
  id: 1,
  topic: "Some theme",
  description: "Default Theme",
};

const RANDOM_CARDS = [
  {
    id: 1,
    front: "What's the answer of everything?",
    back: "42",
    nextReviewDue: new Date(2022, 9 - 1, 10),
    groupId: 1,
  },
  {
    id: 2,
    front: "What's the answer of everything?",
    back: "42",
    nextReviewDue: new Date(2022, 9 - 1, 10),
    groupId: 1,
  },
  {
    id: 3,
    front: "What's the answer of everything?",
    back: "42",
    nextReviewDue: new Date(2022, 9 - 1, 10),
    groupId: 1,
  },
];

describe("[Use Case] Delete Card Group", () => {
  it("should delete card group and cards if it exists", async () => {
    const cardRepository = new InMemoryCardRepository(RANDOM_CARDS);
    const cardGroupRepository = new InMemoryCardGroupRepository([CARD_GROUP]);

    const useCase = new DeleteCardGroup(cardGroupRepository, cardRepository);

    await useCase.execute(CARD_GROUP);

    expect(await cardGroupRepository.findCardGroupById(CARD_GROUP.id)).to.be
      .undefined;
    expect(await cardRepository.findCardsByGroupId(CARD_GROUP.id)).to.be.deep.equal(
      []
    );
  });

  it("should throw an error if the to-be-created card already exists", async () => {
    const cardRepository = new InMemoryCardRepository([]);
    const cardGroupRepository = new InMemoryCardGroupRepository([]);

    const useCase = new DeleteCardGroup(cardGroupRepository, cardRepository);

    return expect(useCase.execute(CARD_GROUP)).to.be.eventually.rejectedWith(
      ERRORS.UNEXISTENT_CARD_GROUP
    );
  });
});
