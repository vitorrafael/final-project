import { CardData } from "../ports/card-data";
import { CardGroupWithCards } from "../ports/card-group";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export interface StartCardGroupReviewRequest {
  topic: string;
}

export class StartCardGroupReview implements UseCase {
  constructor(
    private cardGroupRepository: CardGroupRepository,
    private cardRepository: CardRepository
  ) {}

  public async execute(
    startCardGroupReviewRequest: StartCardGroupReviewRequest
  ): Promise<CardGroupWithCards> {
    const cardGroup = await this.cardGroupRepository.findCardGroupByTheme(
      startCardGroupReviewRequest.topic
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
