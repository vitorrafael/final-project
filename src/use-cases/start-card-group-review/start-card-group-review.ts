import { CardData } from "../ports/card-data";
import { CardGroupWithCards } from "../ports/card-group-data";
import { CardGroupRepository } from "../ports/card-group-repository";
import { CardRepository } from "../ports/card-repository";
import { StartCardGroupReviewRequest } from "../ports/requests";
import { UseCase } from "../ports/use-case";
import { DateHelper } from "../utils/date-helper";
import { ERRORS } from "../utils/errors";


// Coupling = 2 - DateHelper and Error
export class StartCardGroupReview
  implements UseCase<StartCardGroupReviewRequest, CardGroupWithCards>
{
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
      throw ERRORS["UNEXISTENT_CARD_GROUP"];
    }

    const cards = await this.cardRepository.findCardsByGroupId(cardGroup.id);

    const currentDate = DateHelper.getCurrentDate();
    const cardsWithDueReview = this.filterDueCards(cards, currentDate);

    return { ...cardGroup, cards: cardsWithDueReview };
  }

  private filterDueCards(cards: CardData[], dueDate: Date): CardData[] {
    const dueCards = cards.filter((card) =>
      this.isDateSmallerThanOrEqualTo(card.nextReviewDue, dueDate)
    );
    return dueCards;
  }

  private isDateSmallerThanOrEqualTo(
    firstDate: Date,
    secondDate: Date
  ): boolean {
    const dateComparison = DateHelper.compareDates(firstDate, secondDate);
    return dateComparison !== 1;
  }
}
