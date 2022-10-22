import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { DeleteCardGroupController } from "../../src/controllers/delete-card-group-controller";
import { DeleteCardGroup } from "../../src/use-cases";
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

describe("[Controller] Delete Card Group", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...RANDOM_CARD_GROUP },
    ]);
    const cardRepository = new InMemoryCardRepository([{ ...RANDOM_CARD }]);

    useCase = new DeleteCardGroup(cardGroupRepository, cardRepository);
  });

  it("should return 200 if card group was deleted succesfully", async () => {
    const controller = new DeleteCardGroupController(useCase);

    const cardGroupData = {
      id: 1,
    };

    const httpRequest = {
      body: cardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 404 if card group does not exist", async () => {
    const controller = new DeleteCardGroupController(useCase);

    const cardGroupData = {
      id: 999,
    };

    const httpRequest = {
      body: cardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(404);
  });

  it("should return 400 if there are missing required parameters", async () => {
    const controller = new DeleteCardGroupController(useCase);

    const cardGroupData = {};

    const httpRequest = {
      body: cardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new DeleteCardGroupController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
