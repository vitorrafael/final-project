import { CardData } from "../../entities/card/card";
import { CardRepository } from "../../use-cases/create-card/ports/card-repository";

export class InMemoryCardRepository implements CardRepository {
  private cards: CardData[] = [];
  constructor(cards: CardData[]) {
    this.cards = cards;
  }

  findCardByFront(front: string): Promise<CardData> {
    return Promise.resolve(this.cards.find((card) => card.front === front));
  }

  async exists(front: string, back: string) {
    return Boolean(
      this.cards.find((card) => card.front === front && card.back === back)
    );
  }

  async add(cardData: CardData): Promise<void> {
    if (!(await this.exists(cardData.front, cardData.back))) {
      this.cards.push({ ...cardData });
    }
  }
}