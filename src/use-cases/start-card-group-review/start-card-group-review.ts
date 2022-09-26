import { Card } from "../../entities/card/card";
import { CardData } from "../ports/card-data";
import { CardGroupWithCards } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";

export class StartCardGroupReview {
  constructor(
    private cardGroupRepository: CardGroupRepository,
    private cardRepository: CardRepository
  ) {}

  public async startReview(topic: string): Promise<CardGroupWithCards> {
    const cardGroup = await this.cardGroupRepository.findCardGroupByTheme(
      topic
    );

    if (!cardGroup) {
      throw new Error("Card Group not found for selected topic");
    }

    const cards = await this.cardRepository.findCardsByGroupId(cardGroup.id);

    const currentDate = this.getCurrentDate();
    const cardsWithDueReview = this.filterDueCards(cards, currentDate);

    return { ...cardGroup, cards: cardsWithDueReview };
  }

  private getCurrentDate(): Date {
    const tempDate = new Date();
    return new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );
  }

  private filterDueCards(cards: CardData[], dueDate: Date): CardData[] {
    const dueCards = cards.filter((card) => card.nextReviewDue <= dueDate);
    return dueCards;
  }
}
