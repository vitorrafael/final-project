import { Card } from "../../entities/card/card";
import { CardData } from "../ports/card-data";
import { CardRepository } from "../ports/card-repository";
import { UseCase } from "../ports/use-case";

export class CreateCard implements UseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(cardData: CardData): Promise<CardData> {
    const card = Card.create(cardData.front, cardData.back, new Date(), 0, 2.5);

    const isCardAlreadyCreated = await this.cardRepository.exists(
      card.front,
      card.back
    );
    if (isCardAlreadyCreated) {
      throw new Error("Card already exists");
    }

    await this.cardRepository.add({
      front: card.front,
      back: card.back,
      eFactor: card.eFactor,
      nextReviewDue: card.nextReviewDue,
      reviewCount: card.reviewCount,
    });

    const persistedCard = await this.cardRepository.findCardByFront(card.front);

    return persistedCard;
  }
}
