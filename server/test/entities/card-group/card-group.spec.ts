import { expect } from "chai";
import { Card } from "../../../src/entities/card/card";
import { CardGroup } from "../../../src/entities/card-group/card-group";
import { InvalidCardGroupError } from "../../../src/entities/card-group/errors/invalid-card-group-error";
import { InvalidOperationError } from "../../../src/entities/card-group/errors/invalid-operation-error";

const CARD_DATA = {
  groupId: 1,
  front: "What year did the Farroupilha Revolution start?",
  back: "1835",
  nextReviewDue: new Date(),
  reviewCount: 2,
  eFactor: 2.5,
};

let card;
describe("[Entity] CardGroup", () => {
  beforeEach(() => {
    const { groupId, front, back, nextReviewDue, reviewCount, eFactor } = CARD_DATA;
    card = Card.create(groupId, front, back, nextReviewDue, reviewCount, eFactor);
  });

  it("should create a card group with valid information", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
    };

    const cardGroup = CardGroup.create(cardGroupData.topic, cardGroupData.description);

    expect(cardGroup.topic).to.equal(cardGroupData.topic);
    expect(cardGroup.description).to.equal(cardGroupData.description);
  });

  it("should throw an error when creating a card group without a topic", () => {
    const cardGroupData = {
      topic: "",
      description: "History Cards about the Farroupilha Revolution",
    };

    expect(() => CardGroup.create(cardGroupData.topic, cardGroupData.description)).to.throw(
      InvalidCardGroupError,
      "Invalid Card Group - Reason: Invalid topic"
    );
  });

  it("should not throw an error when creating a card group without a description", () => {
    const cardGroupData = {
      topic: "History",
      description: "",
    };

    const cardGroup = CardGroup.create(cardGroupData.topic, cardGroupData.description);

    expect(cardGroup.topic).to.equal(cardGroupData.topic);
    expect(cardGroup.description).to.equal(cardGroupData.description);
  });

  it("should add the card to the card group", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
    };

    const cardGroup = CardGroup.create(cardGroupData.topic, cardGroupData.description);

    cardGroup.addCard(card);

    expect(cardGroup.cards).to.contain(card);
  });

  it("should delete the card from the card group if it is contained", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
    };
    const cardGroup = CardGroup.create(cardGroupData.topic, cardGroupData.description);
    cardGroup.addCard(card);

    cardGroup.removeCard(card);

    expect(cardGroup.cards).to.not.deep.contain(card);
    expect(cardGroup.cards.length).to.be.equal(0);
  });

  it("should throw an error when deleting a card that is not contained", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
    };
    const cardGroup = CardGroup.create(cardGroupData.topic, cardGroupData.description);

    expect(() => cardGroup.removeCard(card)).to.throw(
      InvalidOperationError,
      "Card not in CardGroup"
    );
  });
});
