import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { InMemoryCardGroupRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-group-repository";
import { UpdateCardGroup } from "../../../src/use-cases/update-card-group/update-card-group";

use(chaiAsPromised);

const CARD_GROUP = {
  id: "1",
  topic: "Some theme",
  description: "Default description",
};

const SECOND_CARD_GROUP = {
  id: "2",
  topic: "Second Topic",
  description: "Default Theme",
};

describe("[Use Case] Update Card Grou", () => {
  it("should update the card group topic and description if request contains changes", async () => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...CARD_GROUP },
    ]);
    const useCase = new UpdateCardGroup(cardGroupRepository);

    const updateCardGroupData = {
      id: "1",
      topic: "Updated Topic",
      description: "Updated Description",
    };

    const updatedCardGroup = await useCase.execute(updateCardGroupData);

    expect(updatedCardGroup.topic).to.be.equal("Updated Topic");
    expect(updatedCardGroup.description).to.be.equal("Updated Description");
  });

  it("should not update card group topic if it already exists", async () => {
    const cardGroupRepository = new InMemoryCardGroupRepository([
      { ...CARD_GROUP },
      { ...SECOND_CARD_GROUP },
    ]);
    const useCase = new UpdateCardGroup(cardGroupRepository);

    const updateCardGroupData = {
      id: "1",
      topic: "Second Topic",
      description: "Updated Description",
    };

    const updatedCardGroup = await useCase.execute(updateCardGroupData);

    expect(updatedCardGroup.topic).to.be.equal("Some theme");
    expect(updatedCardGroup.description).to.be.equal("Updated Description");
  });
});
