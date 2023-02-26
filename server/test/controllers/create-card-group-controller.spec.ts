import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { CreateCardGroupController } from "../../src/controllers/create-card-group-controller";
import { CreateCardGroup } from "../../src/use-cases";
import { UseCaseWithErrorStub } from "./helper/use-case-error-stub";

const RANDOM_CARD_GROUP = {
  id: 2,
  topic: "Random",
  description: "Group with Random Questions",
};

describe("CreateCardGroupController", () => {
  let useCase;
  beforeEach(() => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...RANDOM_CARD_GROUP },
    ]);
    useCase = new CreateCardGroup(cardGroupRepository);
  });

  it("should return persisted card group if card does not exist", async () => {
    const controller = new CreateCardGroupController(useCase);

    const newCardGroup = {
      topic: "Math",
      description: "Math Questions",
    };

    const httpRequest = {
      body: newCardGroup,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(200);
  });

  it("should return 400 if card group already exists", async () => {
    const controller = new CreateCardGroupController(useCase);

    const newCardGroup = {
      topic: RANDOM_CARD_GROUP.topic,
      description: RANDOM_CARD_GROUP.description,
    };

    const httpRequest = {
      body: newCardGroup,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 400 if there are missing required parameters", async () => {
    const controller = new CreateCardGroupController(useCase);

    const newCardGroup = {};

    const httpRequest = {
      body: newCardGroup,
    };

    const response = await controller.handleRequest(httpRequest);

    expect(response.statusCode).to.be.equal(400);
  });

  it("should return 500 if an error was thrown", async () => {
    const useCaseWithError = new UseCaseWithErrorStub();
    const controller = new CreateCardGroupController(useCaseWithError);

    const response = await controller.handleRequest({});

    expect(response.statusCode).to.be.equal(500);
  });
});
