import { expect } from "chai";
import { SQLiteHelper } from "../../../../src/adapters/repositories/sqlite/helpers/SQLiteHelper";
import { SQLiteCardRepository } from "../../../../src/adapters/repositories/sqlite/sqlite-card-repository";

describe.only("[Repository] SQLite Card Repository", () => {
  before(async () => {
    await SQLiteHelper.connect("./db/srs-monolith.test.db");
  });

  afterEach(async () => {
    await SQLiteHelper.clearTable("cards");
  });

  after(async () => {
    await SQLiteHelper.closeConnection();
  });

  it("should add card to database", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    expect(await repository.exists("What's the answer of everything?", "42")).to
      .be.true;
  });

  it("should find card by front", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    const foundCard = await repository.findCardByFront(
      "What's the answer of everything?"
    );
    expect(foundCard).to.not.be.undefined;
  });

  it("should find card by id", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    const persistedCard = await repository.findCardByFront(
      "What's the answer of everything?"
    );

    const foundCard = await repository.findCardById(persistedCard.id);
    expect(foundCard).to.not.be.undefined;
  });

  it("should update card data", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    const persistedCard = await repository.findCardByFront(
      "What's the answer of everything?"
    );

    const newCardData = {
      id: persistedCard.id,
      front: "What?",
      back: "Yes",
      nextReviewDue: new Date(2020, 3, 28),
      reviewCount: 4,
      eFactor: 3,
    };

    await repository.update(newCardData);

    const updatedCard = await repository.findCardById(persistedCard.id);

    expect(updatedCard.front).to.be.equal(newCardData.front);
    expect(updatedCard.back).to.be.equal(newCardData.back);
    expect(updatedCard.reviewCount).to.be.equal(newCardData.reviewCount);
    expect(updatedCard.eFactor).to.be.equal(newCardData.eFactor);
  });

  it("should update card front", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    const persistedCard = await repository.findCardByFront(
      "What's the answer of everything?"
    );

    const newCardData = {
      id: persistedCard.id,
      front: "What?",
    };

    const updatedCard = await repository.updateCardFront(
      persistedCard.id,
      newCardData.front
    );

    expect(updatedCard.front).to.be.equal(newCardData.front);
  });

  it("should update card back", async () => {
    const repository = new SQLiteCardRepository();

    await repository.add({
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    });

    const persistedCard = await repository.findCardByFront(
      "What's the answer of everything?"
    );

    const newCardData = {
      id: persistedCard.id,
      back: "Hello World",
    };

    const updatedCard = await repository.updateCardBack(
      persistedCard.id,
      newCardData.back
    );

    expect(updatedCard.back).to.be.equal(newCardData.back);
  });
});
