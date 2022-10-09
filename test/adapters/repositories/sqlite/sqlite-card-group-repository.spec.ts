import { expect } from "chai";
import { SQLiteHelper } from "../../../../src/adapters/repositories/sqlite/helpers/SQLiteHelper";
import { SQLiteCardGroupRepository } from "../../../../src/adapters/repositories/sqlite/sqlite-card-group-repository";

const RANDOM_CARD_GROUP = {
  topic: "Random",
  description: "Random Description",
};

const ANOTHER_RANDOM_CARD_GROUP = {
  topic: "Random 2",
  description: "Second Random Description",
};

describe("[Repository] SQLite Card Group Repository", () => {
  before(async () => {
    await SQLiteHelper.connect("./db/srs-monolith.test.db");
  });

  afterEach(async () => {
    await SQLiteHelper.clearTable("cardGroups");
  });

  after(async () => {
    await SQLiteHelper.closeConnection();
  });

  it("should add card group to database", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    expect(await repository.findCardGroupByTheme("Random")).to.not.be.undefined;
  });

  it("should delete card group from database", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    const cardGroupData = await repository.findCardGroupByTheme("Random");

    await repository.delete(cardGroupData.id);

    expect(await repository.findCardGroupByTheme("Random")).to.be.undefined;
  });

  it("should find card group by theme", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    expect(await repository.findCardGroupByTheme("Random")).to.not.be.undefined;
  });

  it("should find card group by id", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    const cardGroupData = await repository.findCardGroupByTheme("Random");

    expect(await repository.findCardGroupById(cardGroupData.id)).to.not.be
      .undefined;
  });

  it("should find all card groups", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });
    await repository.add({
      ...ANOTHER_RANDOM_CARD_GROUP,
    });

    const cardGroups = await repository.findAllCardGroups();

    expect(cardGroups.length).to.be.equal(2);
  });

  it("should update card group topic", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    const persistedCardGroup = await repository.findCardGroupByTheme(
      RANDOM_CARD_GROUP.topic
    );

    const newCardGroupData = {
      id: persistedCardGroup.id,
      topic: "The randomness reaches another level",
    };

    const updatedCardGroup = await repository.updateTopic(
      newCardGroupData.id,
      newCardGroupData.topic
    );

    expect(updatedCardGroup.topic).to.be.equal(newCardGroupData.topic);
  });

  it("should update card group description", async () => {
    const repository = new SQLiteCardGroupRepository();

    await repository.add({
      ...RANDOM_CARD_GROUP,
    });

    const persistedCardGroup = await repository.findCardGroupByTheme(
      RANDOM_CARD_GROUP.topic
    );

    const newCardGroupData = {
      id: persistedCardGroup.id,
      description: "The randomness reaches another level",
    };

    const updatedCardGroup = await repository.updateDescription(
      newCardGroupData.id,
      newCardGroupData.description
    );

    expect(updatedCardGroup.description).to.be.equal(
      newCardGroupData.description
    );
  });
});
