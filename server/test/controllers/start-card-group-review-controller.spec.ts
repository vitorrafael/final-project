import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { InMemoryCardRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { StartCardGroupReviewController } from "../../src/controllers/start-card-group-review-controller";
import { StartCardGroupReview } from "../../src/use-cases";
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

describe("[Controller] Start Card Group Review", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...RANDOM_CARD_GROUP },
    ]);
    const cardRepository = new InMemoryCardRepository([{ ...RANDOM_CARD }]);

    useCase = new StartCardGroupReview(cardGroupRepository, cardRepository);
  });

  it("should return 200 if requested topic for review exists", async () => {
    const controller = new StartCardGroupReviewController(useCase);

    const startCardGroupReviewData = {
      id: RANDOM_CARD_GROUP.id,
      topic: RANDOM_CARD_GROUP.topic,
    };

    const httpRequest = {
      body: startCardGroupReviewData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if requested card group does not exist", async () => {
    const controller = new StartCardGroupReviewController(useCase);

    const startCardGroupReviewData = {
      id: 999,
      topic: "UNEXISTING TOPIC",
    };

    const httpRequest = {
      body: startCardGroupReviewData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 400 if there are missing required parameters", async () => {
    const controller = new StartCardGroupReviewController(useCase);

    const startCardGroupReviewData = {};

    const httpRequest = {
      body: startCardGroupReviewData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new StartCardGroupReviewController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
