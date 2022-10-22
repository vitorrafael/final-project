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

    Card.validateGroupId(groupId);
    Card.validateCardFront(front);
    Card.validateCardBack(back);
    Card.validateNextReviewDue(nextReviewDue);
    Card.validateReviewCount(reviewCount);
    Card.validateEFactor(eFactor);

    return new Card(groupId, front, back, nextReviewDue, reviewCount, eFactor);
  }

  private static validateEFactor(eFactor: number) {
    if (eFactor <= 0) {
      throw new InvalidCardError("Invalid eFactor");
    }
  }

  private static validateReviewCount(reviewCount: number) {
    if (reviewCount < 0) {
      throw new InvalidCardError("Invalid review count");
    }
  }

  private static validateNextReviewDue(nextReviewDue: Date) {
    if (!nextReviewDue) {
      throw new InvalidCardError("Invalid next review due");
    }
  }

  private static validateCardBack(back: string) {
    if (!back) {
      throw new InvalidCardError("Invalid back content");
    }
  }

  private static validateCardFront(front: string) {
    if (!front) {
      throw new InvalidCardError("Invalid front content");
    }
  }

  private static validateGroupId(groupId: number) {
    if (!groupId) {
      throw new InvalidCardError("Card cannot be created without a Group Id");
    }
  }
}
