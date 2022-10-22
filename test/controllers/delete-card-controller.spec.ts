import { expect } from "chai";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { DeleteCardController } from "../../src/controllers/delete-card-controller";
import { DeleteCard } from "../../src/use-cases";
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

describe("[Controller] Delete Card", () => {
  let useCase;
  beforeEach(() => {
    const cardRepository = new InMemoryCardRepository([RANDOM_CARD]);
    useCase = new DeleteCard(cardRepository);
  });

  it("should return 200 if card is deleted succesfully", async () => {
    const controller = new DeleteCardController(useCase);

    const cardData = {
      id: RANDOM_CARD.id,
    };

    const httpRequest = {
      body: cardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 404 if card does not exist", async () => {
    const controller = new DeleteCardController(useCase);

    const cardData = {
      id: 999,
    };

    const httpRequest = {
      body: cardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(404);
  });

  it("should return 400 if there are missing mandatory parameters", async () => {
    const controller = new DeleteCardController(useCase);

    const cardData = {};

    const httpRequest = {
      body: cardData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new DeleteCardController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
