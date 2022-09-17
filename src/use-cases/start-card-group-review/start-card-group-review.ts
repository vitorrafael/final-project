import { CardGroupWithCards } from "../../entities/card-group/card-group";
import { Card } from "../../entities/card/card";
import { CardGroupRepository } from "../ports/card-group-repository";

export class StartCardGroupReview {
  constructor(private cardGroupRepository: CardGroupRepository) {}

  public async startReview(topic: string): Promise<CardGroupWithCards> {
    const cardGroup = await this.cardGroupRepository.findCardGroupByTheme(
      topic
    );

    if (!cardGroup) {
      throw new Error("Card Group not found for selected topic");
    }

    const currentDate = this.getCurrentDate();
    const cardsWithDueReview = this.filterDueCards(cardGroup, currentDate);

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

  private filterDueCards(cardGroup: CardGroupWithCards, dueDate: Date): Card[] {
    const dueCards = cardGroup.cards.filter(
      (card) => card.nextReviewDue <= dueDate
    );
    return dueCards;
  }
}
