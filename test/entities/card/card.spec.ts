import { expect } from "chai";
import { Card } from "../../../src/entities/card/card";
import { InvalidCardError } from "../../../src/entities/card/errors/invalid-card-error";

describe("[Entity] Card", () => {
  it("should create a card with valid information", () => {
    const cardData = {
      groupId: "1",
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    };

    const card = Card.create(
      cardData.groupId,
      cardData.front,
      cardData.back,
      cardData.nextReviewDue,
      cardData.reviewCount,
      cardData.eFactor
    );

    expect(card.back).to.equal(cardData.back);
    expect(card.front).to.equal(cardData.front);
  });

  it("should throw an error when creating a card without group id", () => {
    const cardData = {
      groupId: "",
      front: "What's the answer of everything?",
      back: "What do you mean?",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    };
    const expectedErrorMessage = "Invalid Card - Reason: Card cannot be created without a Group Id";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });

  it("should throw an error when creating a card with invalid front information", () => {
    const cardData = {
      groupId: "1",
      front: "",
      back: "What do you mean?",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid front content";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });

  it("should throw an error when creating a card with invalid back information", () => {
    const cardData = {
      groupId: "1",
      front: "Some unaswered question?",
      back: "",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 2.5,
    };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid back content";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });

  it("should throw an error when creating a card with invalid next review due", () => {
    const cardData = {
      groupId: "1",
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: undefined,
      reviewCount: 3,
      eFactor: 2.5,
    };
    const expectedErrorMessage =
      "Invalid Card - Reason: Invalid next review due";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });

  it("should throw an error when creating a card with invalid review count", () => {
    const cardData = {
      groupId: "1",
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: -1,
      eFactor: 2.5,
    };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid review count";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });

  it("should throw an error when creating a card with invalid eFactor", () => {
    const cardData = {
      groupId: "1",
      front: "What's the answer of everything?",
      back: "42",
      nextReviewDue: new Date(),
      reviewCount: 3,
      eFactor: 0,
    };
    const expectedErrorMessage = "Invalid Card - Reason: Invalid eFactor";

    expect(() =>
      Card.create(
        cardData.groupId,
        cardData.front,
        cardData.back,
        cardData.nextReviewDue,
        cardData.reviewCount,
        cardData.eFactor
      )
    ).to.throw(InvalidCardError, expectedErrorMessage);
  });
});
