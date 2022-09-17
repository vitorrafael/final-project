import { expect } from "chai";
import { Card } from "../card/card";
import { CardGroup } from "./card-group";
import { InvalidCardGroupError } from "./errors/invalid-card-group-error";
import { InvalidOperationError } from "./errors/invalid-operation-error";

describe("[Entity] CardGroup", () => {
  it("should create a card group with valid information", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
      tags: ["brazil", "revolution", "rs"],
    };

    const cardGroup = CardGroup.create(cardGroupData);

    expect(cardGroup.topic).to.equal(cardGroupData.topic);
    expect(cardGroup.description).to.equal(cardGroupData.description);
    expect(cardGroup.tags).to.deep.equal(cardGroupData.tags);
  });

  it("should throw an error when creating a card group without a topic", () => {
    const cardGroupData = {
      topic: "",
      description: "History Cards about the Farroupilha Revolution",
      tags: ["brazil", "revolution", "rs"],
    };

    expect(() => CardGroup.create(cardGroupData)).to.throw(
      InvalidCardGroupError,
      "Invalid Card Group - Reason: Invalid topic"
    );
  });

  it("should not throw an error when creating a card group without a description nor tags", () => {
    const cardGroupData = {
      topic: "History",
      description: "",
      tags: undefined,
    };

    const cardGroup = CardGroup.create(cardGroupData);

    expect(cardGroup.topic).to.equal(cardGroupData.topic);
    expect(cardGroup.description).to.equal(cardGroupData.description);
    expect(cardGroup.tags).to.deep.equal([]);
  });

  it("should add the card to the card group", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
      tags: ["brazil", "revolution", "rs"],
    };
    const cardData = {
      front: "What year did the Farroupilha Revolution start?",
      back: "1835",
    };
    const card = Card.create(cardData.front, cardData.back);
    const cardGroup = CardGroup.create(cardGroupData);

    cardGroup.addCard(card);

    expect(cardGroup.cards).to.contain(card);
  });

  it("should delete the card from the card group if it is contained", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
      tags: ["brazil", "revolution", "rs"],
    };
    const cardData = {
      front: "What year did the Farroupilha Revolution start?",
      back: "1835",
    };
    const card = Card.create(cardData.front, cardData.back);
    const cardGroup = CardGroup.create(cardGroupData);
    cardGroup.addCard(card);
    
    cardGroup.removeCard(card);

    expect(cardGroup.cards).to.not.deep.contain(card);
    expect(cardGroup.cards.length).to.be.equal(0);
  });

  it("should throw an error when deleting a card that is not contained", () => {
    const cardGroupData = {
      topic: "History",
      description: "History Cards about the Farroupilha Revolution",
      tags: ["brazil", "revolution", "rs"],
    };
    const cardData = {
      front: "What year did the Farroupilha Revolution start?",
      back: "1835",
    };
    const card = Card.create(cardData.front, cardData.back);
    const cardGroup = CardGroup.create(cardGroupData);
    
    expect(() => cardGroup.removeCard(card)).to.throw(InvalidOperationError, "Card not in CardGroup");

  });
});
