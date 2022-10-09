import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { UpdateCardGroupController } from "../../src/controllers/update-card-group-controller";
import { UpdateCardGroup } from "../../src/use-cases/update-card-group/update-card-group";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

const RANDOM_CARD_GROUP_ONE = {
  id: 1,
  topic: "Random",
  description: "Group with Random Questions",
};

const RANDOM_CARD_GROUP_TWO = {
  id: 2,
  topic: "Random 1",
  description: "Group with Random Questions",
};

describe("UpdateCardGroupController", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...RANDOM_CARD_GROUP_ONE },
      { ...RANDOM_CARD_GROUP_TWO },
    ]);
    useCase = new UpdateCardGroup(cardGroupRepository);
  });

  it("should return updated card group if card group data does not exist", async () => {
    const controller = new UpdateCardGroupController(useCase);

    const updateCardGroupData = {
      id: 2,
      topic: "New Random",
      description: "New Random Description",
    };

    const httpRequest = {
      body: updateCardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if updated card data is already used", async () => {
    const controller = new UpdateCardGroupController(useCase);

    const updateCardGroupData = {
      id: RANDOM_CARD_GROUP_TWO.id,
      topic: RANDOM_CARD_GROUP_ONE.topic,
      description: RANDOM_CARD_GROUP_ONE.description,
    };

    const httpRequest = {
      body: updateCardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 400 if there are missing required parameters", async () => {
    const controller = new UpdateCardGroupController(useCase);

    const updateCardGroupData = {};

    const httpRequest = {
      body: updateCardGroupData,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });
  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new UpdateCardGroupController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
