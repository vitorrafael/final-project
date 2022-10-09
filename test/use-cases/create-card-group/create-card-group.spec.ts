import { expect } from "chai";
import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { CreateCardGroup } from "../../../src/use-cases/create-card-group/create-card-group";

describe("[Use Case] Create Card Group", async () => {
  it("should create card group with request information", async () => {
    const cardGroupRepository = new InMemoryCardGroupRepository([]);
    const useCase = new CreateCardGroup(cardGroupRepository);

    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
    };

    const response = await useCase.execute(cardGroupData);

    expect(response.id).to.be.equal(1);
    expect(response.topic).to.be.equal("History");
    expect(response.description).to.be.equal(
      "History Cards about the Farroupilha Revolution"
    );
  });
});
