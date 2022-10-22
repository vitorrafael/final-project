import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { DisplayCardGroupsController } from "../../src/controllers/display-card-groups.controller";
import { DisplayCardGroups } from "../../src/use-cases";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

const RANDOM_CARD_GROUP = {
  id: 1,
  topic: "Random",
  description: "Group with Random Questions",
};

const RANDOM_CARD = {
  id: 1,
  front: "What's the answer of everything?",
  back: "42",
  eFactor: 3.0,
  nextReviewDue: new Date(2022, 10, 18),
  reviewCount: 3,
  groupId: 1,
};

describe("[Controller] Display Card Groups", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...RANDOM_CARD_GROUP },
    ]);
    const cardRepository = new InMemoryCardRepository([{ ...RANDOM_CARD }]);

    useCase = new DisplayCardGroups(cardGroupRepository, cardRepository);
  });

  it("should return 200 when requesting all card groups", async () => {
    const controller = new DisplayCardGroupsController(useCase);

    const httpRequest = { body: {} };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new DisplayCardGroupsController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
