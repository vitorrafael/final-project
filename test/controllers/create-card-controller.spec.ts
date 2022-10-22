import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { CreateCardController } from "../../src/controllers/create-card-controller";
import { CreateCard } from "../../src/use-cases";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

const RANDOM_CARD_GROUP = {
  id: 2,
  topic: "Random",
  description: "Group with Random Questions",
};
const RANDOM_CARD = {
  front: "What's the answer of everything?",
  back: "42",
  groupId: 2,
};

describe("CreateCardController", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      RANDOM_CARD_GROUP,
    ]);
    const cardRepository = new InMemoryCardRepository([RANDOM_CARD]);
    useCase = new CreateCard(cardRepository, cardGroupRepository);
  });

  it("should return persisted card if card does not exist", async () => {
    const controller = new CreateCardController(useCase);

    const newCard = {
      front: "How much is 2 + 2?",
      back: "4",
      groupId: RANDOM_CARD.groupId,
    };

    const httpRequest = {
      body: newCard,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if card already exists", async () => {
    const controller = new CreateCardController(useCase);

    const newCard = {
      front: RANDOM_CARD.front,
      back: RANDOM_CARD.back,
      groupId: RANDOM_CARD.groupId,
    };

    const httpRequest = {
      body: newCard,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 400 if there are missing mandatory parameters", async () => {
    const controller = new CreateCardController(useCase);

    const newCard = {};

    const httpRequest = {
      body: newCard,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new CreateCardController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
