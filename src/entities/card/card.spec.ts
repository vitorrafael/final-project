import { expect } from "chai";
import { Card } from "./card";
import { InvalidCardError } from "./errors/invalid-card-error";

describe("[Entity] Card", () => {
  it("should create a card with valid information", () => {
    const cardData = { front: "What's the answer of everything?", back: "42" };

    const card = Card.create(cardData.front, cardData.back);

    expect(card.back).to.equal(cardData.back);
    expect(card.front).to.equal(cardData.front);
  });

  it("should throw an error when creating a card with invalid front information", () => {
    const cardData = { front: "", back: "What do you mean?" };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid front content";

    expect(() => Card.create(cardData.front, cardData.back)).to.throw(
      InvalidCardError,
      expectedErrorMessage
    );
  });

  it("should throw an error when creating a card with invalid back information", () => {
    const cardData = { front: "Some unaswered question?", back: "" };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid back content";

    expect(() => Card.create(cardData.front, cardData.back)).to.throw(
      InvalidCardError,
      expectedErrorMessage
    );
  });
});
