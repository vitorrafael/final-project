import { Card } from "../card/card";
import { InvalidCardGroupError } from "./errors/invalid-card-group-error";
import { InvalidOperationError } from "./errors/invalid-operation-error";

export interface CardGroupData {
  id?: string;
  topic: string;
  description: string;
}

export class CardGroup {
  public cards: Card[] = [];

  private constructor(
    public readonly topic: string,
    public readonly description: string
  ) {}

  static create(cardGroupData: CardGroupData): CardGroup {
    const { topic, description } = cardGroupData;

    if (!topic) {
      throw new InvalidCardGroupError("Invalid topic");
    }

    return new CardGroup(topic, description);
  }

  public addCard(card: Card) {
    this.cards.push(card);
  }

  public removeCard(card: Card) {
    const cardIndex = this.cards.findIndex(
      (potentialCard) =>
        potentialCard.front === card.front && potentialCard.back === card.back
    );

    const isCardInCardGroup = cardIndex !== -1;
    if (!isCardInCardGroup) {
      throw new InvalidOperationError(
        "Invalid Operation - Reason: Card not in CardGroup"
      );
    } else {
      this.cards.splice(cardIndex, 1);
    }
  }
}
