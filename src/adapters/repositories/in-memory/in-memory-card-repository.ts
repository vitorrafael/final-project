import { CardData, CardRepository } from "../../../use-cases/ports";

// Coupling 0
export class InMemoryCardRepository implements CardRepository {
  private cards: CardData[] = [];
  constructor(cards: CardData[]) {
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

  async findCardById(id: number): Promise<CardData> {
    const cardData = this.cards.find((card) => card.id === id);

    return Promise.resolve(
      cardData && {
        ...cardData,
        nextReviewDue: new Date(
          cardData.nextReviewDue.getFullYear(),
          cardData.nextReviewDue.getMonth(),
          cardData.nextReviewDue.getDate()
        ),
      }
    );
  }

  async findCardsByGroupId(groupId: number): Promise<CardData[]> {
    const cards = this.cards.filter((card) => card.groupId === groupId);

    return Promise.resolve(cards);
  }

  async add(cardData: CardData): Promise<void> {
    this.cards.push({ id: this.cards.length, ...cardData });
  }

  async update(cardData: CardData): Promise<void> {
    const cardIndex = this.cards.findIndex((card) => card.id === cardData.id);
    const id = this.cards[cardIndex].id;
    this.cards[cardIndex] = { id, ...cardData };
  }

  async updateCardFront(id: number, updatedFront: string): Promise<CardData> {
    const cardIndex = this.cards.findIndex((card) => card.id === id);
    this.cards[cardIndex].front = updatedFront;
    return this.findCardById(id);
  }

  async updateCardBack(id: number, updatedBack: string): Promise<CardData> {
    const cardIndex = this.cards.findIndex((card) => card.id === id);
    this.cards[cardIndex].back = updatedBack;
    return this.findCardById(id);
  }

  async delete(id: number): Promise<void> {
    const cardIndex = this.cards.findIndex((card) => card.id === id);
    this.cards.splice(cardIndex, 1);
  }

  async deleteByGroupId(groupId: number): Promise<void> {
    this.cards = this.cards.filter((card) => card.groupId !== groupId);
  }
}
