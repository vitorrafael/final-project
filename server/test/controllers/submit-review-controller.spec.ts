import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { SubmitReviewController } from "../../src/controllers/submit-review-controller";
import { SuperMemoAlgorithm } from "../../src/entities/super-memo/super-memo-algorithm";
import { SubmitReview } from "../../src/use-cases";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

use(chaiAsPromised);

const RANDOM_CARD = {
  id: 1,
  front: "What year did the Farroupilha Revolution start?",
  back: "1835",
  nextReviewDue: new Date(2022, 9 - 1, 10),
  reviewCount: 3,
  eFactor: 2.5,
  groupId: 1,
};

describe("[Controller] Submit Review", () => {
  let useCase;
  beforeEach(() => {
    const cardRepository = new InMemoryCardRepository([{ ...RANDOM_CARD }]);
    useCase = new SubmitReview(cardRepository, new SuperMemoAlgorithm());
  });

  it("should return 200 if request is handled sucessfully", async () => {
    const controller = new SubmitReviewController(useCase);

    const reviewData = {
      id: RANDOM_CARD.id,
      cardFront: RANDOM_CARD.front,
      responseQuality: 3,
    };

    const httpRequest = {
      body: reviewData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if there are missing required parameters", async () => {
    const controller = new SubmitReviewController(useCase);

    const reviewData = {};

    const httpRequest = {
      body: reviewData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new SubmitReviewController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
