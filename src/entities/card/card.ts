import { InvalidCardError } from "./errors/invalid-card-error";

export class Card {
  private constructor(
    public readonly front: string,
    public readonly back: string,
    public readonly nextReviewDue: Date,
    public readonly reviewCount: number,
    public readonly eFactor: number
  ) {}

  static create(
    front: string,
    back: string,
    nextReviewDue: Date,
    reviewCount: number,
    eFactor: number
  ): Card {
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

    return new Card(front, back, nextReviewDue, reviewCount, eFactor);
  }
}
