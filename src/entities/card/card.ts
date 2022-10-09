import { InvalidCardError } from "./errors/invalid-card-error";

export class Card {
  private constructor(
    public readonly groupId: number,
    public readonly front: string,
    public readonly back: string,
    public readonly nextReviewDue: Date,
    public readonly reviewCount: number,
    public readonly eFactor: number
  ) {}

  static create(
    groupId: number,
    front: string,
    back: string,
    nextReviewDue: Date,
    reviewCount: number,
    eFactor: number
  ): Card {
    if (!groupId) {
      throw new InvalidCardError("Card cannot be created without a Group Id")
    }

    if (!front) {
      throw new InvalidCardError("Invalid front content");
    }

    if (!back) {
      throw new InvalidCardError("Invalid back content");
    }

    if (!nextReviewDue) {
      throw new InvalidCardError("Invalid next review due");
    }

    if (reviewCount < 0) {
      throw new InvalidCardError("Invalid review count");
    }

    if (eFactor <= 0) {
      throw new InvalidCardError("Invalid eFactor");
    }

    return new Card(groupId, front, back, nextReviewDue, reviewCount, eFactor);
  }
}
