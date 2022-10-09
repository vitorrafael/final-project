import { expect } from "chai";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { UpdateCardController } from "../../src/controllers/update-card-controller";
import { UpdateCard } from "../../src/use-cases/update-card/update-card";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

const RANDOM_CARD = {
  id: 1,
  front: "What's the answer of everything?",
  back: "42",
  eFactor: 3.0,
  nextReviewDue: new Date(2022, 10, 18),
  reviewCount: 3,
  groupId: 1,
};

describe("UpdateCardController", () => {
  let useCase;
  beforeEach(() => {
    const cardRepository = new InMemoryCardRepository([{ ...RANDOM_CARD }]);
    useCase = new UpdateCard(cardRepository);
  });

  it("should return updated card if card data does not exist", async () => {
    const controller = new UpdateCardController(useCase);

    const updatedCardData = {
      id: 1,
      front: "How much is 2 + 2?",
      back: "4",
      groupId: RANDOM_CARD.groupId,
    };

    const httpRequest = {
      body: updatedCardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if updated card data is already used", async () => {
    const controller = new UpdateCardController(useCase);

    const updatedCardData = {
      front: RANDOM_CARD.front,
      back: RANDOM_CARD.back,
      groupId: RANDOM_CARD.groupId,
    };

    const httpRequest = {
      body: updatedCardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 400 if there are missing mandatory parameters", async () => {
    const controller = new UpdateCardController(useCase);

    const updatedCardData = {};

    const httpRequest = {
      body: updatedCardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new UpdateCardController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
