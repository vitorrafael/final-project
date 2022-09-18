import { use, expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { InMemoryCardRepository } from "../../../src/adapters/repositories/in-memory/in-memory-card-repository";
import { CardData } from "../../../src/use-cases/ports/card-data";
import { UpdateCard } from "../../../src/use-cases/update-card/update-card";

use(chaiAsPromised);

describe("[Use Case] Update Card", () => {
  it("should update the card front and back and reset review data if request contains changes", async () => {
    const cardData: CardData = {
      id: "1",
      front: "What's the answer of everything?",
      back: "42",
      eFactor: 3.0,
      nextReviewDue: new Date(2022, 10, 18),
      reviewCount: 3,
    };
    const repository = new InMemoryCardRepository([cardData]);
    const useCase = new UpdateCard(repository);

    const updateCardData = {
      id: "1",
      front: "Some random question",
      back: "What?",
    };

    const updatedCard = await useCase.update(updateCardData);

    expect(updatedCard.front).to.be.equal("Some random question");
    expect(updatedCard.back).to.be.equal("What?");
    expect(updatedCard.eFactor).to.be.equal(2.5);
    expect(updatedCard.nextReviewDue.toDateString()).to.be.equal(
      new Date().toDateString()
    );
    expect(updatedCard.reviewCount).to.be.equal(0);
  });

  it("should not update card front if it already exists", async () => {
    const cardData: CardData = {
      id: "1",
      front: "What's the answer of everything?",
      back: "42",
      eFactor: 3.0,
      nextReviewDue: new Date(2022, 10, 18),
      reviewCount: 3,
    };
    const anotherCardData: CardData = {
      id: "2",
      front: "How much is 15 plus 13?",
      back: "38",
      eFactor: 2.23,
      nextReviewDue: new Date(2022, 10, 15),
      reviewCount: 2,
    };
    const repository = new InMemoryCardRepository([cardData, anotherCardData]);
    const useCase = new UpdateCard(repository);

    const updateCardData = {
      id: "1",
      front: "How much is 15 plus 13?",
    };

    const updatedCard = await useCase.update(updateCardData);

    expect(updatedCard.front).to.be.equal("What's the answer of everything?");
    expect(updatedCard.eFactor).to.be.equal(3);
    expect(updatedCard.nextReviewDue.toDateString()).to.be.equal(
      new Date(2022, 10, 18).toDateString()
    );
    expect(updatedCard.reviewCount).to.be.equal(3);
  });

  it("should not reset review information if no changes are passed", async () => {
    const cardData: CardData = {
      id: "1",
      front: "What's the answer of everything?",
      back: "42",
      eFactor: 3.0,
      nextReviewDue: new Date(2022, 10, 18),
      reviewCount: 3,
    };
    const repository = new InMemoryCardRepository([cardData]);
    const useCase = new UpdateCard(repository);

    const updateCardData = {
      id: "1",
    };

    const updatedCard = await useCase.update(updateCardData);

    expect(updatedCard.front).to.be.equal("What's the answer of everything?");
    expect(updatedCard.back).to.be.equal("42");
    expect(updatedCard.eFactor).to.be.equal(3.0);
    expect(updatedCard.nextReviewDue.toDateString()).to.be.equal(
      new Date(2022, 10, 18).toDateString()
    );
    expect(updatedCard.reviewCount).to.be.equal(3);
  });
});
