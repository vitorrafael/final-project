import { CardData } from "../../entities/card/card";
import {
  CardRepository,
  RepositoryCardData,
} from "../../use-cases/create-card/ports/card-repository";

export class InMemoryCardRepository implements CardRepository {
  private cards: RepositoryCardData[] = [];
  constructor(cards: RepositoryCardData[]) {
    this.cards = cards;
  }

  async findCardByFront(front: string): Promise<CardData> {
    const cardData = this.cards.find((card) => card.front === front);

    return Promise.resolve(
      cardData && {
        ...cardData,
      }
    );
  }

  async findCardById(id: string): Promise<RepositoryCardData> {
    const cardData = this.cards.find((card) => card.id === id);

    return Promise.resolve({
      ...cardData,
      nextReviewDue: new Date(
        cardData.nextReviewDue.getFullYear(),
        cardData.nextReviewDue.getMonth(),
        cardData.nextReviewDue.getDate()
      ),
    });
  }

  async exists(front: string, back: string) {
    return Boolean(
      this.cards.find((card) => card.front === front && card.back === back)
    );
  }

  async add(cardData: CardData): Promise<void> {
    if (!(await this.exists(cardData.front, cardData.back))) {
      this.cards.push({ id: this.cards.length.toString(), ...cardData });
    }
  }

  async update(cardData: CardData): Promise<void> {
    if (await this.exists(cardData.front, cardData.back)) {
      const cardIndex = this.cards.findIndex(
        (card) => card.front === cardData.front
      );
      const id = this.cards[cardIndex].id;
      this.cards[cardIndex] = { id, ...cardData };
    }
  }
}
