import { InvalidCardError } from "./errors/invalid-card-error";

export class CardData {
  front: string;
  back: string;
}

export class Card {
  private constructor(
    public readonly front: string,
    public readonly back: string
  ) {}

  static create(cardData: CardData): Card {
    const { front, back } = cardData;

    if (!front) {
      throw new InvalidCardError("Invalid front content");
    }

    if (!back) {
      throw new InvalidCardError("Invalid back content");
    }

    return new Card(front, back);
  }
}
