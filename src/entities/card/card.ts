import { InvalidCardError } from "./errors/invalid-card-error";

export interface CardData {
  front: string;
  back: string;
  nextReviewDue?: Date;
  reviewCount?: number;
  eFactor?: number;
}

export class Card {
  private constructor(
    public readonly front: string,
    public readonly back: string,
    public readonly nextReviewDue: Date,
    public readonly reviewCount: number,
    public readonly eFactor: number
  ) {}

  static create(cardData: CardData): Card {
    const { front, back, nextReviewDue, reviewCount, eFactor } = cardData;
    const nextReview = nextReviewDue || new Date();
    const numberOfReviews = reviewCount || 0;
    const actualEFactor = eFactor || 2.5;

    if (!front) {
      throw new InvalidCardError("Invalid front content");
    }

    if (!back) {
      throw new InvalidCardError("Invalid back content");
    }

    return new Card(front, back, nextReview, numberOfReviews, actualEFactor);
  }
}
